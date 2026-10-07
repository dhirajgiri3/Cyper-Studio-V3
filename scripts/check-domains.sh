#!/usr/bin/env bash
# Domain integrity (Spec 6.2, 6.6, D-10, D-11). Set CANON_HOST once Q-01 is decided.
set -uo pipefail
source "$(dirname "$0")/lib.sh"
CANON_HOST="${CANON_HOST:-cyper.studio}"
CANON_RE="${CANON_HOST//./\\.}"
fail=0
# 1. any hostname other than the canonical one
if grep -rIniE "${GREP_EXCLUDES[@]}" -e 'https?://[a-z0-9.-]+' "${SCAN_DIRS[@]}" 2>/dev/null \
   | grep -viE "https?://(www\.)?${CANON_RE}|schema\.org|w3\.org|sitemaps\.org"; then
  echo "Non-canonical hostname found"; fail=1
fi
# 2. forbidden hosts: subdomains of either domain, staging, localhost
if grep -rIniE "${GREP_EXCLUDES[@]}" -e '[a-z0-9-]+\.(cyperstudio\.in|cyper\.studio)|localhost|vercel\.app|netlify\.app' "${SCAN_DIRS[@]}" 2>/dev/null \
   | grep -viE "(^|[^a-z0-9-])(www\.)?${CANON_RE}"; then
  echo "Subdomain or staging host found"; fail=1
fi
# 3. old domain must not appear except in the optional /about history line (review each hit by hand)
if grep -rIniE "${GREP_EXCLUDES[@]}" -e 'cyperstudio\.in' "${SCAN_DIRS[@]}" 2>/dev/null; then
  echo "NOTE: old domain referenced. Allowed only for the Q-10 history line on /about."; fail=1
fi
# 4. emails outside the canonical domain
if grep -rIiohE "${GREP_EXCLUDES[@]}" '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}' "${SCAN_DIRS[@]}" 2>/dev/null \
   | grep -viE "@${CANON_RE}$"; then
  echo "Non-canonical email found"; fail=1
fi
[ $fail -eq 0 ] && echo "check-domains: OK (canonical host: $CANON_HOST)"
exit $fail
