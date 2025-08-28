#!/usr/bin/env sh
set -eu
others="$(git ls-files '**/package-lock.json' | grep -v '^package-lock.json$' || true)"
[ -z "$others" ] || { echo "Nested lockfiles found:\n$others"; exit 1; }
