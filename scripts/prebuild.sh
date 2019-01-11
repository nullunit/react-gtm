#!/usr/bin/env bash

VERSION="$(scripts/version.sh $(git describe --long --tags))"

echo "Building ${npm_package_name}@$VERSION"
