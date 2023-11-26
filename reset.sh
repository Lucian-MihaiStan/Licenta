#!/bin/sh

docker compose down
docker volume ls -q | xargs docker volume rm
docker compose up
