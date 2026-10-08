# Page review checklist (PROPOSED, not locked)

Status: proposal from Brief 01 v2.1, Appendix A (the founder's twelve Key Learnings, as gates). Intended final home: `/docs/design-system/PAGE_REVIEW_CHECKLIST.md`. It is saved here because Brief 01 hard stop 2 limits this round's writes to `/docs/home-lab/**`; moving it is a one-line founder decision (see Conflicts, C-8).

Use on every page. Report each item PASS / FAIL / NEEDS FOUNDER with evidence (screenshot name, code reference or command output). A hero that fails 1, 2, 3, 5 or 10 cannot be recommended.

| # | Gate | Test | Evidence to attach |
|---|---|---|---|
| 1 | First viewport answers everything (10 s) | Company, product, audience, outcome all in plain text at 1440 x 800 and 390 x 844 without scrolling. Script reads the rendered text. Founder runs a 5-second test on 3 people outside the team. | script output; names of testers and what they said |
| 2 | Product-first, not agency-first | HELIX is the centre; Cyper Studio is "the product engineering company behind HELIX". Banned-word scan returns zero hits. | `scripts/check-banned.sh <paths>` output |
| 3 | Domain and email consistency | One canonical domain (`cyper.studio`) and `info@cyper.studio` in canonical, OG tags, footer, contact, schema. No mixed domains in any file. | grep output; canonical / og:url / JSON-LD lines |
| 4 | Clarity beats cleverness | Every section opens with its point; specific nouns over hype. List any heading that is clever rather than clear. | heading list with verdicts |
| 5 | Real product signals | Real operator-console UI only, from real captures. No stock or generic dashboards. Illustrative frames are labelled. Traction line is a `{{CONFIRM}}` text claim; no logos. | frame captions; list of unresolved placeholders |
| 6 | Structure over decoration | Nav and footer expose /helix, /about, /contact or /demo, /changelog, /blog, /pricing or "Talk to us", /status, /security, privacy, terms. State which exist and which are placeholders. Flag decoration that explains nothing. | link table with status |
| 7 | Design system first | Only tokens; any new token listed; nothing built as a one-off. | token delta list |
| 8 | Performance and hygiene | Budgets measured; primary content server-rendered; semantic HTML; mobile excellence; JS-off passes. | Lighthouse (5 runs), bytes, JS-off screenshot |
| 9 | Conversion path | One primary action; secondary actions lighter; form short (at most four required fields); success state and response expectation clear. | field count; success state; `{{CONFIRM}}` for response time |
| 10 | Honesty and specificity | No invented features, metrics or customers. "Live today" and "planned" distinguished. Mechanics described specifically. | claim map (IDs and status) |
| 11 | Founding year and identity | "Founded 2024" in footer, about line and structured data, identical everywhere. Legal name and city stay `{{CONFIRM}}` until confirmed. | grep output |
| 12 | Visual personality matches the audience | Calm confidence and operational seriousness; dense but clean. Name each effect that leans "creative agency" or "trendy" and justify or cut it. | effect list with verdicts |

Cold test protocol (item 1): show the page for 5 seconds with the founder not present; ask "What company? What product? Who is it for? What does it do for them?"; record verbatim answers; a page passes when 3 of 3 answer all four correctly.
