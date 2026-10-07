#!/usr/bin/env bash
# One-hop 301 redirects to the canonical domain (Spec 6.2, 18.8). Needs network.
set -euo pipefail
CANON="${CANON:-https://cyper.studio}"
OLD="${OLD:-https://cyperstudio.in}"
for u in "http://${CANON#https://}/" "https://www.${CANON#https://}/" "$OLD/" "$OLD/helix" "http://${OLD#https://}/helix"; do
  echo "== $u"; curl -sIL -o /dev/null -w "hops=%{num_redirects} final=%{url_effective} code=%{http_code}\n" "$u"
done
echo "Expect: one 301 hop and final URL on $CANON for every non-canonical URL."
