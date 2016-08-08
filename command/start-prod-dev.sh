#!/bin/bash

# After a deploy, you may want to test the prod build locally.
# This script starts the latest prod build locally.

docker-compose \
    --project-name dandelion \
    -f infrastructure/docker-compose.dev-prod.run.yml \
    up
