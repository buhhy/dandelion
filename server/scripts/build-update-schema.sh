#!/bin/bash

mkdir -p ../shared

node $NODE_PATH/webpack/bin/webpack.js \
    --config ./config/webpack.config.dev.prepare-schema.js \
    --quiet

node ./build/prepare-schema.js
