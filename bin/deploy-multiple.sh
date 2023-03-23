#!/bin/bash

# Have a csv file with the different devices ready to go.
# Format should be 
# 'network_1_ssid, network_1_passwd, network_1_host'
# SSID and Password are for connecting to the network
# Host is for the connection to the local device
# If empty host defaults to value below
# Note that this is meant for internal use and based on MacOS

file="network.csv"

while IFS=',' read -r WIFI_SSID WIFI_PASSWD HOST; 
do
  if [[ $HOST -ne "" ]]; then
    HOST="172.24.24.1"
  fi
  networksetup -setairportnetwork en0 $WIFI_SSID $WIFI_PASSWD
  ./deploy.sh $HOST $USER
  sleep 5
done < "$file"

