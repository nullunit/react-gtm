#!/usr/bin/env bash

VERSION="$(scripts/version.sh $(git describe --long --tags))"

echo "Updating package.json"

npm --no-git-tag-version --allow-same-version version $VERSION
