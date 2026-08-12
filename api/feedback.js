// Feedback intake for AroTaro. Creates a Linear issue in the Arotaro team via
// GraphQL, then posts a title+link notification to Discord. Two callers,
// distinguished by the `source` field:
//
//   "site" (or absent) — the website's contact form (same-origin /api/feedback).
//   "app"              — the AroTaro mobile app's feedback screen
//                        (frontend/src/libs/feedback.ts), which posts
//                        cross-origin from a native client, omits `name`, may
//                        omit `email`, sends no attachment, and adds a
//                        `diagnostics` object rendered into the issue body.
//
// `source` only ever widens what is accepted, never what is trusted: every
// string that reaches a Linear title or body is length-capped and stripped of
// newlines/control characters first (see `inline`), because all of it is
// user-controlled on both paths.
//
// Dev fallback: when Linear env vars are unset (local dev, preview without
// secrets), returns 503 with friendly copy instead of crashing — see
// recipes/standards/dev-fallback-pattern.md. The Discord webhook is optional
// on top of that: unset just means no notification, not a 503.

const LINEAR_API_KEY = process.env.LINEAR_API_KEY_AROTARO;
const LINEAR_TEAM_ID = process.env.LINEAR_TEAM_ID_AROTARO;

// Optional: posts a deterministic "title + link" message to Discord after a
// Linear issue is created. Unset in dev/preview by default — no-ops silently
// (not a 503 boundary; the contact form still works without it).
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL_AROTARO;

// Every issue from this endpoint gets the Feedback label so all form intake is
// filterable in one view; the category-specific label stacks on top.
const FEEDBACK_LABEL = process.env.LINEAR_LABEL_FEEDBACK_AROTARO;
const LABEL_BY_CATEGORY = {
  "technical-issues": process.env.LINEAR_LABEL_BUG_AROTARO,
  "payment-issues": process.env.LINEAR_LABEL_BUG_AROTARO,
  "suggestions-feedback": process.env.LINEAR_LABEL_FEATURE_AROTARO,
  // general-inquiries / other: Feedback label only; the category is still
  // preserved in the issue body.
};

// The allowlist AND the display names. Keys are the website form's raw i18n
// keys (src/pages/Questions/Questions.js `TOPIC_KEYS`) and the app's
// `FEEDBACK_CATEGORIES` values — both send the key, never the translated
// label, so one vocabulary drives labels, titles and bodies in every locale.
// A category outside this set is a 400: it would otherwise land unlabelled
// and unfilterable.
const CATEGORY_NAMES = {
  "technical-issues": "Technical issue",
  "payment-issues": "Payment issue",
  "suggestions-feedback": "Suggestion / feedback",
  "general-inquiries": "General inquiry",
  other: "Something else",
};

const MAX_CONTENT_LENGTH = 10000;
// `name` and `email` are interpolated into a Linear title and body, so they get
// their own bounds rather than riding on the content limit.
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 practical maximum
const MAX_DIAGNOSTIC_LENGTH = 120;
// 3MB raw ≈ 4MB base64 — stays under Vercel's ~4.5MB request-body limit.
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Flatten an untrusted string to a single line before it lands in a Linear
 * title or a `**Label:** value` row. Without this, a newline in `name` lets a
 * submitter forge additional metadata rows in the issue body.
 */
function inline(value, max) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/**
 * Render the app's diagnostics object into issue-body rows. Every value is
 * treated as untrusted text (the client is a phone, not a trusted peer), so
 * each one is flattened and capped, and unknown keys are dropped entirely.
 */
function diagnosticsBlock(diagnostics) {
  if (!diagnostics || typeof diagnostics !== "object") return [];
  const rows = [
    ["App", diagnostics.app],
    ["Platform", diagnostics.platform],
    ["Locale", diagnostics.locale],
  ];
  return rows
    .map(([label, value]) => [label, inline(value, MAX_DIAGNOSTIC_LENGTH)])
    .filter(([, value]) => value)
    .map(([label, value]) => `**${label}:** ${value}`);
}

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

  const { name, email, category, content, attachment, company, diagnostics } =
    req.body || {};

  // Honeypot: real users never see or fill this field. It does nothing against
  // a script hitting this endpoint directly (and nothing at all on the app
  // path, which never sends it) — it only filters dumb form spam on the web.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  // Anything not explicitly claiming to be the app is treated as the website
  // form, which keeps the stricter web rules (name + email required) as the
  // default for an unrecognised caller.
  const isApp = req.body && req.body.source === "app";

  // The app deliberately doesn't ask for a name — nobody wants to type one to
  // report a bug — so it gets a fixed one.
  const submitterName = isApp ? "AroTaro app" : inline(name, MAX_NAME_LENGTH);
  const submitterEmail = typeof email === "string" ? email.trim() : "";

  if (!submitterName || !category || !content) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }
  // Reject rather than truncate, so an oversized field is a visible error
  // instead of silently mangled text in a Linear issue.
  if (typeof name === "string" && name.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ ok: false, error: "Name is too long" });
  }
  if (typeof content !== "string" || content.length > MAX_CONTENT_LENGTH) {
    return res.status(400).json({ ok: false, error: "Message is too long" });
  }
  if (!Object.prototype.hasOwnProperty.call(CATEGORY_NAMES, category)) {
    return res.status(400).json({ ok: false, error: "Unknown category" });
  }
  // Email is required on the website form but optional in the app: requiring an
  // address to report a bug is a real drop-off, and it changes the data-
  // collection story. If it's given, it still has to be valid.
  if (!isApp && !submitterEmail) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }
  if (submitterEmail) {
    if (submitterEmail.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({ ok: false, error: "Email address is too long" });
    }
    if (!EMAIL_RE.test(submitterEmail)) {
      return res.status(400).json({ ok: false, error: "Invalid email address" });
    }
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
    // The app never sends one (a screenshot of AroTaro is a screenshot of
    // someone's reading), so this stays on the website path in practice.
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

    const categoryName = CATEGORY_NAMES[category];
    const diagnosticLines = isApp ? diagnosticsBlock(diagnostics) : [];

    const metaLines = [];
    // The app's name is a constant, so printing it would be noise; the source
    // line and the `[AroTaro app]` title prefix already say where it came from.
    if (!isApp) metaLines.push(`**Name:** ${submitterName}`);
    metaLines.push(`**Email:** ${submitterEmail || "not provided"}`);
    metaLines.push(`**Category:** ${categoryName}`);
    if (isApp) metaLines.push(`**Source:** AroTaro app`);

    const description =
      [...metaLines, "", content].join("\n") +
      attachmentLine +
      (diagnosticLines.length ? `\n\n---\n${diagnosticLines.join("\n")}` : "");

    const labelIds = [FEEDBACK_LABEL, LABEL_BY_CATEGORY[category]].filter(Boolean);
    // App issues have to be distinguishable at a glance in triage — the website
    // form's title carries a person's name, which an app report never has, so
    // it carries the build instead (the first thing anyone asks about a bug).
    const appVersion = isApp
      ? inline(diagnostics && diagnostics.app, MAX_DIAGNOSTIC_LENGTH)
      : "";
    const title = (
      isApp
        ? `[AroTaro app] ${categoryName}${appVersion ? ` — v${appVersion}` : ""}`
        : `[Contact] ${categoryName} — ${submitterName}`
    ).slice(0, 200);

    const data = await linearGraphQL(
      `mutation($input: IssueCreateInput!) {
        issueCreate(input: $input) { success issue { url } }
      }`,
      {
        input: {
          teamId: LINEAR_TEAM_ID,
          title,
          description,
          labelIds: labelIds.length > 0 ? labelIds : undefined,
        },
      }
    );
    if (!data || !data.issueCreate || !data.issueCreate.success) {
      console.error("[feedback] issueCreate did not succeed:", JSON.stringify(data));
      return res.status(502).json({ ok: false, error: "Submission failed" });
    }
    const issue = data.issueCreate.issue;
    if (issue && issue.url) {
      // Best-effort: a Discord hiccup shouldn't turn a successful submission
      // into an error response.
      await notifyDiscord(title, issue.url).catch((err) => {
        console.error("[feedback] Discord notify failed:", err);
      });
    }
    return res.status(200).json({ ok: true, ticketUrl: issue ? issue.url : undefined });
  } catch (err) {
    console.error("[feedback] unexpected error:", err);
    return res.status(502).json({ ok: false, error: "Submission failed" });
  }
};

// Fixed message shape (title + link only) — no LLM involved, deliberately.
async function notifyDiscord(title, ticketUrl) {
  if (!DISCORD_WEBHOOK_URL) return;
  const resp = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `${title}\n${ticketUrl}` }),
  });
  if (!resp.ok) {
    throw new Error(`Discord webhook responded ${resp.status}`);
  }
}

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
