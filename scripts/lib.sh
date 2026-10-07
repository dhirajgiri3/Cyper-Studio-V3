#!/usr/bin/env bash
# Shared helpers for the Cyper Studio release gates (Spec Appendix E).
# Source this file; do not execute it.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Directories that hold shippable copy/code. Only existing ones are scanned.
# The Spec's `src/` is `app/` in this repository.
SCAN_DIRS=()
for d in content app public out dist; do
  [ -d "$d" ] && SCAN_DIRS+=("$d")
done

GREP_EXCLUDES=(--exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git)
