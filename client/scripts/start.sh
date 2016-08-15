#!/bin/bash

mkdir -p ../shared

node $NODE_PATH/supervisor/lib/cli-wrapper.js \
    --watch /home/dandelion/shared/schema.json,./config/*,./scripts/start.js \
    --quiet \
    node ./scripts/start.js
