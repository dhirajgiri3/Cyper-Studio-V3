---
description: Print one section of the redesign Spec by number or keyword (e.g. /spec 14.4, /spec claim register)
argument-hint: "<section number or keyword>"
allowed-tools: Bash(grep:*), Read
---

The Spec is `Cyper_Studio_Redesign.md` (about 2,100 lines). Never read it whole.

Argument: `$ARGUMENTS`

1. Find the heading: `grep -n '^#\{2,3\} ' Cyper_Studio_Redesign.md` and match the number or keyword (sections are numbered `## 14.` / `### 14.4`).
2. Read from that heading to the next heading of the same or higher level, using `Read` with `offset` and `limit`.
3. Show the section verbatim, then one line on how it constrains the current task. If nothing matches, list the closest headings.
