#!/usr/bin/env bash
# Fails if any banned term (Spec 13.3) appears in shippable copy or code.
# Usage: scripts/check-banned.sh [path ...]   (defaults to content/ app/ public/)
set -uo pipefail
source "$(dirname "$0")/lib.sh"
paths=("$@"); [ ${#paths[@]} -eq 0 ] && paths=("${SCAN_DIRS[@]}")
fail=0
while IFS= read -r pattern; do
  [ -z "$pattern" ] && continue
  if grep -rIniE "${GREP_EXCLUDES[@]}" -e "$pattern" "${paths[@]}" 2>/dev/null; then
    echo "BANNED TERM MATCH: $pattern"; fail=1
  fi
done < scripts/banned-terms.txt
[ $fail -eq 0 ] && echo "check-banned: OK"
exit $fail
