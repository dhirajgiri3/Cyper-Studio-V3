#!/usr/bin/env bash
# Runs every static gate (no network, no running server) and prints a summary.
# Exit code is non-zero if any gate fails. Legacy agency-era files are expected to fail until migrated.
set -uo pipefail
cd "$(dirname "$0")/.."
gates=(check-placeholders check-banned check-domains check-founding-year)
failed=()
for g in "${gates[@]}"; do
  echo "──── $g"
  if ! bash "scripts/$g.sh"; then failed+=("$g"); fi
done
echo
if [ ${#failed[@]} -eq 0 ]; then echo "ALL STATIC GATES PASSED"; exit 0; fi
echo "FAILED GATES: ${failed[*]}"
echo "Not run here (need a server/network): check-nojs, check-meta-length, check-redirects, Lighthouse CI."
exit 1
