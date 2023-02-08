#!/bin/bash

if [ -z "$1" ]; then
    echo "Host not set. Usage: $0 <host ip>"
    exit -1
fi

POSITIONAL=()
while [[ $# -gt 0 ]]; do
    key="$1"
    
    case $key in
        -u|--username)
            USERNAME="$2"
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

echo "Building app.."
npm run build

echo "Uploading dist/* to ${USERNAME}@${HOST}:/data/www/app/"

ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${USERNAME}@${HOST} "mkdir -p /data/www/app/"

rsync --delete -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" -r dist/* ${USERNAME}@${HOST}:/data/www/app/
