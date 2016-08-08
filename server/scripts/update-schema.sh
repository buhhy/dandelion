#!/bin/bash

mkdir -p ../shared

node $NODE_PATH/webpack/bin/webpack.js \
    --config ./config/webpack.config.dev.prepare-schema.js

node $NODE_PATH/supervisor/lib/cli-wrapper.js \
    --watch ./build/prepare-schema.js \
    --quiet \
    --no-restart-on exit \
    ./build/prepare-schema.js &

sleep 5

node $NODE_PATH/webpack/bin/webpack.js \
    --watch \
    --debug \
    --config ./config/webpack.config.dev.prepare-schema.js
