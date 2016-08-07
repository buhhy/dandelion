#!/bin/bash

node ../server-deps/node_modules/webpack/bin/webpack.js \
    --config ./config/webpack.config.dev.server.js

node ../server-deps/node_modules/supervisor/lib/cli-wrapper.js \
    --watch ./build/server.js \
    --quiet \
    --no-restart-on error \
    ./build/server.js &

sleep 5

node ../server-deps/node_modules/webpack/bin/webpack.js \
    --watch \
    --debug \
    --config ./config/webpack.config.dev.server.js \
