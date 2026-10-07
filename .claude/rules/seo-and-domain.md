---
paths:
  - "app/layout.js"
  - "app/**/page.*"
  - "app/sitemap.*"
  - "app/robots.*"
  - "public/**"
  - "next.config.mjs"
---

# SEO, domain, and structured data

- One constant: `SITE_URL` / `siteConfig` (Spec Appendix C). Canonicals, Open Graph, JSON-LD, sitemap, robots, emails are derived from it. Never hardcode a hostname or email. `app/layout.js` currently hardcodes `https://cyperstudio.in`; replace it.
- Default canonical `https://cyper.studio`, pending Q-01. `info@` on the same domain. `www` -> apex, http -> https, old domain -> canonical by one 301 hop, configured in hosting, not client JS.
- **No subdomain of either domain, anywhere** (no `helix.cyperstudio.in`, no API health host, no operator-login link until Q-06). No `localhost`, `vercel.app`, `netlify.app`.
- `<html lang="en-IN">`, `locale: en_IN`. One h1 per page. Unique titles <= 60 chars and descriptions <= 160 chars (Spec 17.3 table). Title pattern: `HELIX | ...` on `/`, `... | Cyper Studio` elsewhere.
- JSON-LD: Organization (Cyper Studio, `foundingDate: "2024"`), WebSite, SoftwareApplication (HELIX), BreadcrumbList on inner pages, FAQPage, Article on posts. Every value must appear on the page. No `offers`, `aggregateRating`, `review`, or `sameAs` unless real.
- `robots` and `sitemap` list only live, indexable, canonical URLs. `/changelog` (>= 3 real entries) and `/blog` (>= 2 real posts) stay out of nav and sitemap until then. `/llms.txt` per Appendix D. 404 returns HTTP 404.
- Founding year is 2024 everywhere (footer, about, JSON-LD, application).
