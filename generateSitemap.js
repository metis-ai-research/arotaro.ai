const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const fs = require("fs");
const { Readable } = require("stream");

const stream = new SitemapStream({ hostname: "https://arotaro.ai/" });

stream.write({ url: "/", changefreq: "monthly", priority: 1 });
stream.write({ url: "/promo", changefreq: "monthly", priority: 1 });
stream.write({ url: "/contact-us", changefreq: "monthly", priority: 0.7 });
stream.write({ url: "/about", changefreq: "monthly", priority: 0.7 });
stream.write({ url: "/support", changefreq: "monthly", priority: 0.7 });
stream.write({ url: "/support/policy", changefreq: "monthly", priority: 0.5 });
stream.write({ url: "/support/faq", changefreq: "monthly", priority: 0.5 });

stream.end();

streamToPromise(stream).then((sitemapXml) => {
  fs.writeFileSync("./public/sitemap.xml", sitemapXml);
});
