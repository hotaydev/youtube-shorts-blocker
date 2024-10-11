#!/bin/bash

rm youtube-shorts-blocker-v*.zip

VERSION=$(cat ./manifest.json | jq .version | tr -d '"')

zip -r youtube-shorts-blocker-v${VERSION}.zip ./manifest.json ./scripts ./popup ./images ./_locales
