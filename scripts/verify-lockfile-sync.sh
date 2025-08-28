#!/usr/bin/env sh
set -eu
cp package-lock.json package-lock.json.bak
npm install --package-lock-only --workspaces --include-workspace-root --ignore-scripts
if ! git diff --quiet -- package-lock.json; then
  echo "package-lock.json is out of sync with manifests."
  git --no-pager diff -- package-lock.json | sed -n '1,200p'
  mv package-lock.json.bak package-lock.json
  exit 1
fi
mv package-lock.json.bak package-lock.json
