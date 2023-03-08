#!/bin/bash

cmd.exe /c "C:\Program Files\Docker\Docker\Docker Desktop.exe"

docker_id=$(docker ps -a | cut -d " " -f 1 | tail -n 1)

docker start $docker_id
docker ps -a

cmd.exe /c idea64.exe "C:\Users\stanl\Documents\Univeristy\lic\LivePark" &

cd livepark_app 
code . &

cmd.exe /c npm run dev
