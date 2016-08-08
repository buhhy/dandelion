#!/bin/bash

node $NODE_PATH/webpack/bin/webpack.js \
    --config ./config/webpack.config.dev.server.js

node $NODE_PATH/supervisor/lib/cli-wrapper.js \
    --watch ./build/server.js \
    --quiet \
    --no-restart-on error \
    ./build/server.js &

sleep 5

node $NODE_PATH/webpack/bin/webpack.js \
    --watch \
    --debug \
    --config ./config/webpack.config.dev.server.js \
