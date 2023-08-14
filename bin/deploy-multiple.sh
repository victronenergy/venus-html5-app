#!/bin/zsh

BUILD=false
REBOOT=false
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -b|--build)
            BUILD=true
            shift # past argument
        ;;
    esac
    case $key in
        -r|--reboot)
            REBOOT=true
            shift # past argument
        ;;
    esac
done

if $BUILD; then
  echo "Building app.."
  npm run build
fi

# Source: https://gitlab.elnino.tech/elnino/snooze/victron-mfd/-/wikis/Home
# Simrad MFD: 172.25.9.234
# Raymarine MFD: 172.25.9.64
# Furuno MFD: 172.25.9.35
# Garmin MFD: 172.25.9.217
# Garmin 2 MFD: 172.25.9.122

# Associative array
declare -A MFDs
MFDs[Simrad]="172.25.9.234"
MFDs[Raymarine]="172.25.9.64"
MFDs[Furuno]="172.25.9.35"
MFDs[Garmin]="172.25.9.217"
MFDs[Garmin2]="172.25.9.122"

# Call deploy.sh for each MFD in a loop
for MFD in "${MFDs[@]}"; do
  echo "Deploying to $MFD..."
  bin/deploy.sh ${MFD} 
  # Reboot device if requested
  if $REBOOT; then
    echo "Rebooting $MFD..."
    ssh root@${MFD} "reboot"
  fi
done