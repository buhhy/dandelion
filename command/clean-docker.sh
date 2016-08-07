#!/bin/bash

docker rm $(docker ps -a -q)
docker rmi -f $(docker images -q -a -f dangling=true)
docker volume rm $(docker volume ls -q -f dangling=true)
