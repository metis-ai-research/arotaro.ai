// Contact-form intake for arotaro.ai. Creates a Linear issue in the Arotaro
// team via GraphQL. Same-origin only (called as /api/feedback from the SPA).
//
// Dev fallback: when Linear env vars are unset (local dev, preview without
// secrets), returns 503 with friendly copy instead of crashing — see
// recipes/standards/dev-fallback-pattern.md.

const LINEAR_API_KEY = process.env.LINEAR_API_KEY_AROTARO;
const LINEAR_TEAM_ID = process.env.LINEAR_TEAM_ID_AROTARO;

const LABEL_BY_CATEGORY = {
  "technical-issues": process.env.LINEAR_LABEL_BUG_AROTARO,
  "payment-issues": process.env.LINEAR_LABEL_BUG_AROTARO,
  "suggestions-feedback": process.env.LINEAR_LABEL_FEATURE_AROTARO,
  // general-inquiries / other: unlabeled; the category is still preserved
  // in the issue body.
};

const MAX_CONTENT_LENGTH = 10000;
// 3MB raw ≈ 4MB base64 — stays under Vercel's ~4.5MB request-body limit.
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;

// Best-effort per-warm-instance rate limit. Not durable across cold starts,
// which is acceptable for a contact form's threat model.
const rateBuckets = new Map();
function checkRateLimit(ip, max = 5, windowMs = 60000) {
  const now = Date.now();
  const entry = rateBuckets.get(ip);
  if (!entry || now > entry.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (!LINEAR_API_KEY || !LINEAR_TEAM_ID) {
    return res.status(503).json({
      ok: false,
      error: "Contact form is not configured right now. Please try again later.",
    });
  }

  const { name, email, category, content, attachment, company } = req.body || {};

  // Honeypot: real users never see or fill this field. Accept and drop.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !category || !content) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }
  if (typeof content !== "string" || content.length > MAX_CONTENT_LENGTH) {
    return res.status(400).json({ ok: false, error: "Message is too long" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email address" });
  }

  const ip =
    (String(req.headers["x-forwarded-for"] || "").split(",")[0] || "").trim() ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      ok: false,
      error: "Too many requests. Please try again in a minute.",
    });
  }

  try {
    let attachmentLine = "";
    if (attachment && attachment.dataUrl && attachment.filename) {
      const uploaded = await uploadAttachment(attachment).catch((err) => {
        // Best-effort: losing the issue over an attachment glitch would be
        // worse than losing the attachment.
        console.error("[feedback] attachment upload failed:", err);
        return null;
      });
      if (uploaded) {
        attachmentLine = `\n\n**Attachment:** [${attachment.filename}](${uploaded.assetUrl})`;
      } else {
        // Upload failed (e.g. API key lacks the `write` scope) — still record
        // that the sender attached something, so it can be requested again.
        attachmentLine = `\n\n**Attachment:** ${attachment.filename} (could not be uploaded)`;
      }
    }

    const description =
      [
        `**Name:** ${name}`,
        `**Email:** ${email}`,
        `**Category:** ${category}`,
        "",
        content,
      ].join("\n") + attachmentLine;

    const labelId = LABEL_BY_CATEGORY[category];
    const data = await linearGraphQL(
      `mutation($input: IssueCreateInput!) {
        issueCreate(input: $input) { success issue { url } }
      }`,
      {
        input: {
          teamId: LINEAR_TEAM_ID,
          title: `[Contact] ${category} — ${name}`.slice(0, 200),
          description,
          labelIds: labelId ? [labelId] : undefined,
        },
      }
    );
    if (!data || !data.issueCreate || !data.issueCreate.success) {
      console.error("[feedback] issueCreate did not succeed:", JSON.stringify(data));
      return res.status(502).json({ ok: false, error: "Submission failed" });
    }
    const issue = data.issueCreate.issue;
    return res.status(200).json({ ok: true, ticketUrl: issue ? issue.url : undefined });
  } catch (err) {
    console.error("[feedback] unexpected error:", err);
    return res.status(502).json({ ok: false, error: "Submission failed" });
  }
};

async function linearGraphQL(query, variables) {
  const resp = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Linear expects the raw API key, NOT "Bearer <key>".
      Authorization: LINEAR_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await resp.json();
  if (json.errors) {
    throw new Error(`Linear GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

async function uploadAttachment({ dataUrl, filename, contentType }) {
  const base64 = String(dataUrl).split(",")[1];
  if (!base64) throw new Error("Malformed data URL");
  const buffer = Buffer.from(base64, "base64");
  if (buffer.length > MAX_ATTACHMENT_BYTES) {
    throw new Error(`Attachment too large: ${buffer.length} bytes`);
  }
  const mime = contentType || "application/octet-stream";

  const data = await linearGraphQL(
    `mutation($contentType: String!, $filename: String!, $size: Int!) {
      fileUpload(contentType: $contentType, filename: $filename, size: $size) {
        success
        uploadFile {
          uploadUrl
          assetUrl
          headers { key value }
        }
      }
    }`,
    { contentType: mime, filename, size: buffer.length }
  );
  const uploadFile = data && data.fileUpload && data.fileUpload.uploadFile;
  if (!data || !data.fileUpload || !data.fileUpload.success || !uploadFile) {
    throw new Error("fileUpload mutation failed");
  }

  const headers = { "Content-Type": mime, "Cache-Control": "public, max-age=31536000" };
  for (const h of uploadFile.headers || []) {
    headers[h.key] = h.value;
  }
  const putResp = await fetch(uploadFile.uploadUrl, {
    method: "PUT",
    headers,
    body: buffer,
  });
  if (!putResp.ok) {
    throw new Error(`Attachment PUT failed: ${putResp.status}`);
  }
  return { assetUrl: uploadFile.assetUrl };
}
