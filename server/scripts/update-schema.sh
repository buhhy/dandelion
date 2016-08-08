#!/bin/bash

node ../server-deps/node_modules/webpack/bin/webpack.js \
    --config ./config/webpack.config.dev.prepare-schema.js

node ../server-deps/node_modules/supervisor/lib/cli-wrapper.js \
    --watch ./build/prepare-schema.js \
    --quiet \
    --no-restart-on exit \
    ./build/prepare-schema.js &

sleep 5

node ../server-deps/node_modules/webpack/bin/webpack.js \
    --watch \
    --debug \
    --config ./config/webpack.config.dev.prepare-schema.js
