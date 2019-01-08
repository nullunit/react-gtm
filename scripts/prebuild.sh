#!/usr/bin/env bash

VERSION="$(node scripts/version.js $(git describe --long --tags))"

echo "Building ${npm_package_name}@$VERSION"
