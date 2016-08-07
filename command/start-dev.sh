#!/bin/bash

docker-compose \
    --project-name dandelion-dev \
    -f infrastructure/docker-compose.dev.yml \
    up --build
