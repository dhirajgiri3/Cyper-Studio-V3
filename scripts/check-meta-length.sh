#!/usr/bin/env bash
# Titles <= 60 chars, descriptions <= 160 chars (Spec 17.3). Usage: check-meta-length.sh URL [URL ...]
set -uo pipefail
[ $# -gt 0 ] || { echo "usage: check-meta-length.sh http://localhost:3000/ [more urls]"; exit 2; }
fail=0
for u in "$@"; do
  html="$(curl -sL "$u")"
  title="$(printf '%s' "$html" | grep -o '<title>[^<]*' | head -1 | sed 's/<title>//')"
  desc="$(printf '%s' "$html" | grep -o 'name="description" content="[^"]*' | head -1 | sed 's/.*content="//')"
  echo "$u  title=${#title}  description=${#desc}"
  [ "${#title}" -gt 60 ]  && { echo "  TITLE too long (max 60)"; fail=1; }
  [ "${#desc}" -gt 160 ] && { echo "  DESCRIPTION too long (max 160)"; fail=1; }
  [ -z "$title" ] && { echo "  TITLE missing"; fail=1; }
  [ -z "$desc" ] && { echo "  DESCRIPTION missing"; fail=1; }
done
exit $fail
