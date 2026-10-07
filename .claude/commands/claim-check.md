---
description: Check copy in files or directories against the Spec claim register and banned list
argument-hint: "<file or directory>"
allowed-tools: Read, Grep, Glob, Bash(bash scripts/check-banned.sh:*), Agent
---

Audit `$ARGUMENTS` for truthfulness. Delegate the judgement to the `claim-auditor` agent with the path and ask for its structured report, then run `bash scripts/check-banned.sh $ARGUMENTS` yourself for the mechanical part.

Return: table of each factual sentence -> claim ID -> tag -> verdict (OK / needs `{{CONFIRM}}` / remove), the banned-term hits, and rewrite suggestions taken from Spec 13.5. Do not edit files unless the user asks.
