#!/bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]; do
    key="$1"
    
    case $key in
        -u|--username)
            USERNAME="$2"
            shift # past argument
            shift # past value
        ;;
        -h|--host)
            HOST="$2"
            shift # past argument
            shift # past value
        ;;
        *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
        ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

USERNAME=${USERNAME:-root}
HOST=${HOST:-10.46.107.13}

scp -r app/ ${USERNAME}@${HOST}:/var/www/venus
