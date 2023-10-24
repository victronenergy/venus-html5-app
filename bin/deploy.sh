#!/bin/bash

if [ -z "$1" ]; then
    echo "Host not set. Usage: $0 <host ip>"
    exit 1
fi

BUILD=false
MKPATH=false
PORT=22
POSITIONAL=()
while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -u|--username)
            USERNAME="$2"
            shift # past argument
            shift # past value
        ;;
        -b|--build)
            BUILD=true
            shift # past argument
        ;;
        -m|--mkpath)
            MKPATH=true
            shift # past argument
        ;;
        -p|--port)
            PORT="$2"
            shift # past argument
            shift # past value
        ;;
        *)  # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
        ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

USERNAME=${USERNAME:-root}
HOST="$1"

if $BUILD; then
  echo "Building app.."
  npm run build
fi

echo "Uploading dist/* to ${USERNAME}@${HOST}:/data/www/app/"

if $MKPATH; then
  echo "mkdir -p /data/www/app/"
  ssh -p "${PORT}" -oStrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "${USERNAME}"@"${HOST}" "mkdir -p /data/www/app/"
fi

rsync --delete --info=progress2 -e "ssh -p ${PORT} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" -r dist/* "${USERNAME}"@"${HOST}":/data/www/app/
