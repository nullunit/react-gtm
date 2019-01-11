#!/usr/bin/env bash

# regex the output from `git describe --long` (e.g. v0.0.0-4-gd8bff40)
[[ $1 =~ ^v([0-9]*)\.([0-9]*)\.[0-9]*-([0-9]*)-(.*)$ ]]

# Parse each version component (or '0' if regex match failed)
MAJOR="${BASH_REMATCH[1]}"
if [[ -z "$MAJOR" ]]; then
   MAJOR="0"
fi

MINOR="${BASH_REMATCH[2]}"
if [[ -z "$MINOR" ]]; then
   MINOR="0"
fi

REVISION="${BASH_REMATCH[3]}"
if [[ -z "$REVISION" ]]; then
   REVISION="0"
fi

echo "${MAJOR}.${MINOR}.${REVISION}"
