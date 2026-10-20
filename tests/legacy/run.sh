#!/bin/sh
# Boots the built dist/ in historical browser engines (see docker-compose.yml) against a venus-docker simulation
# and fails if any engine reports a JS error or does not reach the connected state.
#
#   npm run build && npm run test:legacy
#   APP_PATH=/ npm run test:legacy     # for a PUBLIC_URL=/ build
set -eu
cd "$(dirname "$0")"

APP_PATH=${APP_PATH:-/app/}
TIMEOUT=${TIMEOUT:-90}
# inside the docker network the app is served by nginx as "app" and the simulation as "venus"
export APP_URL="http://app${APP_PATH}?host=venus&port=9001&path=%02%03"
export TIMEOUT
CHROMIUM_TARGETS=${CHROMIUM_TARGETS:-"chrome49 chrome73"}
# targets that are run and reported but do not fail the suite: the app (MobX 6) needs Proxy, which the
# Safari 9 era JavaScriptCore of WebKitGTK 2.10 does not have (the webpack build did not work there either)
ALLOW_FAIL=${ALLOW_FAIL:-"webkit601"}

[ -f ../../dist/index.html ] || { echo "dist/index.html not found, run npm run build first"; exit 1; }

cleanup() { docker compose down --remove-orphans >/dev/null 2>&1 || true; }
trap cleanup EXIT

docker compose up -d --build app venus
failed=""
allowed=""

record_failure() {
  case " $ALLOW_FAIL " in
    *" $1 "*) allowed="$allowed $1" ;;
    *) failed="$failed $1" ;;
  esac
}

# chromium targets expose the devtools protocol on the host port 9222, so they run one after another
for target in $CHROMIUM_TARGETS; do
  docker compose up -d --build "$target"
  if ! NAME="$target" CDP_URL=http://localhost:9222 node smoke.mjs; then record_failure "$target"; fi
  docker compose stop "$target" >/dev/null
done

if ! docker compose run --rm --build webkit601; then record_failure webkit601; fi

[ -n "$allowed" ] && echo "legacy smoke test failed for allowed targets:$allowed"
if [ -n "$failed" ]; then
  echo "legacy smoke test FAILED for:$failed"
  exit 1
fi
echo "legacy smoke test OK"
