#!/bin/bash

RED="\e[31m"
RST="\e[0m"

username=`docker info | grep Username | cut -c 11-`

if [ -z "$username" ]; then
    echo -e "$RED Need to be logged into docker. Run docker login.$RST"
    exit 0
fi
