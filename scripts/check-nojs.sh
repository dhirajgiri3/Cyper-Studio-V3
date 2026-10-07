#!/usr/bin/env bash
# Five-question test without JavaScript (Spec 3.2). Run against a built/preview URL.
# Usage: scripts/check-nojs.sh http://localhost:3000/
set -euo pipefail
URL="${1:?usage: check-nojs.sh https://host/}"
html="$(curl -sL -A 'Mozilla/5.0 (compatible; reviewer-check)' "$URL")"
req=("<h1" "white-label" "logistics" "Cyper Studio" "2024" "info@" "HELIX")
fail=0
for s in "${req[@]}"; do
  echo "$html" | grep -qi -- "$s" || { echo "MISSING without JS: $s"; fail=1; }
done
[ $fail -eq 0 ] && echo "check-nojs: OK"
exit $fail
