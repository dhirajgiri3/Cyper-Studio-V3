#!/usr/bin/env bash
# Fails while any {{CONFIRM ...}} or {{DECISION ...}} placeholder is in shippable output (Spec 1.3, 4.3).
set -uo pipefail
source "$(dirname "$0")/lib.sh"
paths=("${SCAN_DIRS[@]}"); [ -d .next ] && paths+=(.next)
if grep -rIn --exclude-dir=node_modules -e '{{CONFIRM' -e '{{DECISION' "${paths[@]}" 2>/dev/null; then
  echo "Unresolved placeholders found"; exit 1
fi
echo "check-placeholders: OK"
