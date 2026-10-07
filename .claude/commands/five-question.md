---
description: Run the Spec 3.2 ten-second reviewer test on a route, with and without JavaScript
argument-hint: "[route, default /]"
allowed-tools: Bash(curl -sL http://localhost:3000/:*), Bash(bash scripts/check-nojs.sh:*), Bash(bash scripts/check-meta-length.sh:*), Read, Grep
---

Run the five-question test for route `${ARGUMENTS:-/}` against the dev or production server at `http://localhost:3000` (tell the user to start `npm run dev` or `npm run build && npm run start` if nothing answers).

Questions (Spec 3.2): 1 What is this company? 2 What is the concrete product? 3 Who is the target customer? 4 Is it a real, early-stage company building something specific? 5 Does the email domain match the website domain?

Procedure:
1. **Without JS:** `curl -sL` the route, strip tags, and answer all five from the raw HTML only. Run `bash scripts/check-nojs.sh <url>` and `bash scripts/check-meta-length.sh <url>`.
2. **First viewport:** from the source (and a screenshot if a browser tool is available), say what is visible at 1366x768 and 390x844 without scrolling: h1, subhead, trust line, primary CTA.
3. Score each question Pass / Partial / Fail with the quoted evidence. Fewer than 5 passes is P0.
4. List the claim IDs the visible copy relies on and flag any `[BRIEF-ONLY]` claim shown as fact.
5. Recommend the next Impeccable command for each failure.

State plainly what you could not verify (no browser, server not running, JS-on view not checked).
