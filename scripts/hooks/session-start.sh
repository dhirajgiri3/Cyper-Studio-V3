#!/usr/bin/env bash
# Claude Code SessionStart hook: print a short orientation and the current gate baseline.
cd "$(dirname "$0")/../.." || exit 0
banned=$(bash scripts/check-banned.sh 2>/dev/null | grep -vc 'BANNED TERM MATCH\|check-banned: OK')
dom=$(bash scripts/check-domains.sh 2>/dev/null | grep -cE '^(app|content|public)/')
ph=$(bash scripts/check-placeholders.sh 2>/dev/null | grep -c '{{')
cat <<MSG
Cyper Studio / HELIX website. Spec: Cyper_Studio_Redesign.md (use /spec <section>). Context: CLAUDE.md, PRODUCT.md, DESIGN.md.
Gate baseline: banned-term lines=$banned, domain/email findings=$dom, unresolved placeholders=$ph (legacy hits are the migration backlog).
Start UI/copy work with /impeccable-guide <target>. /overdrive is disabled. Report only gates you actually ran.
MSG
exit 0
