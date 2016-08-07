#!/bin/bash

docker rm $(docker ps -a -q)
docker rmi -f $(docker images -q -a)
docker volume rm $(docker volume ls -q)
