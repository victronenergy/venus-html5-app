#!/bin/sh
# Old Chromium has no headless mode, run it on a virtual framebuffer with remote debugging enabled.
# (xvfb-run from Ubuntu 16.04 does not reliably start the command under emulation, so Xvfb is started by hand)
Xvfb :99 -screen 0 1280x720x24 -nolisten tcp >/dev/null 2>&1 &
export DISPLAY=:99
sleep 2
# old Chrome ignores --remote-debugging-address and only listens on 127.0.0.1, forward the exposed port to it
socat TCP-LISTEN:9222,fork,reuseaddr TCP:127.0.0.1:9223 &
exec /opt/chrome-linux/chrome \
  --no-sandbox --disable-gpu --no-first-run --no-default-browser-check --disable-translate \
  --user-data-dir=/tmp/profile --window-size=1280,720 \
  --remote-debugging-port=9223 \
  about:blank
