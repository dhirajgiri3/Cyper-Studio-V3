---
description: Run the static release gates and summarize failures by file with a suggested migration order
allowed-tools: Bash(bash scripts/check-all.sh), Bash(bash scripts/check-banned.sh:*), Bash(bash scripts/check-domains.sh), Bash(bash scripts/check-placeholders.sh), Bash(bash scripts/check-founding-year.sh), Read, Grep
---

Run `bash scripts/check-all.sh` and report:

1. Pass or fail for each gate: placeholders, banned terms, domains, founding year.
2. Failures grouped by file (not by pattern), with counts, sorted by most hits first.
3. For each of the top five files: the command that fixes it (`/clarify` for copy, `/quieter` for effects, `/distill` for removal, `/extract` for hardcoded host/email into `siteConfig`).
4. Anything the static gates cannot see: no-JS render, meta length, redirects, Lighthouse. Say these were not run.

Do not edit files and do not weaken any gate or pattern list. Keep the report under 40 lines.
