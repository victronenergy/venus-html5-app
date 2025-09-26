#!/bin/sh

find ./dist -name \*.gz | xargs gunzip

npx serve -C -l 8000 ./
