#!/bin/bash

node ../server-deps/node_modules/webpack/bin/webpack.js \
    --config ./config/webpack.config.dev.prepare-schema.js

node ./build/prepare-schema.js
