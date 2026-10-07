#!/usr/bin/env bash
# Claude Code PostToolUse hook: after an edit under app/, content/ or public/, flag Spec violations
# in the edited file only. Exit 2 feeds the message back to Claude; exit 0 is silent.
# Pre-existing hits in legacy files are expected during migration: fix the ones you touch.
set -uo pipefail
cd "$(dirname "$0")/../.."

file="$(python3 -I -c 'import json,sys
try:
    d=json.load(sys.stdin); print((d.get("tool_input") or {}).get("file_path",""))
except Exception:
    print("")' 2>/dev/null)"

[ -n "$file" ] && [ -f "$file" ] || exit 0
rel="${file#"$PWD"/}"
case "$rel" in
  app/*|content/*|public/*) ;;
  *) exit 0 ;;
esac
case "$rel" in
  *.js|*.jsx|*.ts|*.tsx|*.css|*.md|*.mdx|*.json|*.txt|*.html|*.xml|*.mjs) ;;
  *) exit 0 ;;
esac

CANON_HOST="${CANON_HOST:-cyper.studio}"
CANON_RE="${CANON_HOST//./\\.}"
out=""

while IFS= read -r p; do
  [ -z "$p" ] && continue
  hit="$(grep -niE -e "$p" "$file" 2>/dev/null | head -3)"
  [ -n "$hit" ] && out+="banned term /$p/:"$'\n'"$hit"$'\n'
done < scripts/banned-terms.txt

hit="$(grep -noE 'https?://[A-Za-z0-9.-]+' "$file" 2>/dev/null \
  | grep -viE "https?://(www\.)?${CANON_RE}|schema\.org|w3\.org|sitemaps\.org" | head -5)"
[ -n "$hit" ] && out+="non-canonical host (Spec 6.2, D-11):"$'\n'"$hit"$'\n'

hit="$(grep -noE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}' "$file" 2>/dev/null \
  | grep -viE "@${CANON_RE}$" | head -3)"
[ -n "$hit" ] && out+="non-canonical email (Spec 6.2):"$'\n'"$hit"$'\n'

hit="$(grep -niE -e '(founded|since|established|est\.)[^.]{0,40}(2022|2023)' -e '(2022|2023)[^.]{0,40}(founded|since|established)' "$file" 2>/dev/null | head -3)"
[ -n "$hit" ] && out+="founding year must be 2024 (D-02):"$'\n'"$hit"$'\n'

case "$rel" in
  *.js|*.jsx|*.css)
    hit="$(grep -nE 'pulse-glow|text-shimmer|sparkle|blob-slow|accent-gradient|react-confetti|tsparticles|@react-three|matter-js|prefers-color-scheme: *dark' "$file" 2>/dev/null | head -3)"
    [ -n "$hit" ] && out+="agency-era effect or dark mode (Spec D-03, 14.6, 15.4):"$'\n'"$hit"$'\n'
    ;;
esac

if [ -n "$out" ]; then
  {
    echo "Spec check on $rel (edited just now):"
    printf '%s' "$out" | head -30
    echo "Fix hits you introduced or touched. Legacy hits elsewhere in this file are the migration backlog. See Cyper_Studio_Redesign.md Sections 6, 13, 14, 15."
  } >&2
  exit 2
fi
exit 0
