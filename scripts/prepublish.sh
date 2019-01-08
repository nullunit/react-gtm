#!/usr/bin/env bash

VERSION="$(node scripts/version.js $(git describe --long --tags))"

echo "Updating package.json"

npm --no-git-tag-version --allow-same-version version $VERSION
