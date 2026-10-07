#!/usr/bin/env bash
# Founding year must read 2024 everywhere (D-02).
set -uo pipefail
source "$(dirname "$0")/lib.sh"
if grep -rIniE "${GREP_EXCLUDES[@]}" \
     -e '(founded|since|established|est\.)[^.]{0,40}(2022|2023)' \
     -e '(2022|2023)[^.]{0,40}(founded|since|established)' \
     "${SCAN_DIRS[@]}" 2>/dev/null; then
  echo "Founding-year inconsistency (must be 2024)"; exit 1
fi
echo "check-founding-year: OK"
