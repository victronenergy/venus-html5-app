#!/bin/sh
# (xvfb-run from Ubuntu 16.04 does not reliably start the command under emulation, so Xvfb is started by hand)
Xvfb :99 -screen 0 1280x720x24 -nolisten tcp >/dev/null 2>&1 &
export DISPLAY=:99
sleep 2
exec python3 /smoke.py
