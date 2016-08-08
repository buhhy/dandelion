#!/bin/bash

# Note: You need to `docker login` before you can deploy.
./infrastructure/util/ensure_docker_authed.sh

SERVER_PATH="/srv/servers/dandelion"

docker-compose \
    --project-name dandelion \
    -f infrastructure/docker-compose.prod.build.yml \
    build

docker tag dandelion_client:latest sheepie/dandelion-client:latest
docker tag dandelion_server:latest sheepie/dandelion-server:latest

docker push sheepie/dandelion-client
docker push sheepie/dandelion-server

scp infrastructure/util/ensure_docker_authed.sh \
    infrastructure/docker-compose.prod.run.yml \
    ec2-user@terencelei.com:$SERVER_PATH

ssh ec2-user@terencelei.com 'bash -s' <<-END
    cd $SERVER_PATH

    ./ensure_docker_authed.sh

    docker pull sheepie/dandelion-client
    docker pull sheepie/dandelion-server

    # -d means run in daemon mode, i.e. no interactive shell
    docker-compose \
        --project-name dandelion \
        -f docker-compose.prod.run.yml \
        up -d --remove-orphans
END
