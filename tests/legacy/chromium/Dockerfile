# Historical Chromium build from the public chromium-browser-snapshots bucket, running under xvfb with the
# DevTools protocol exposed on port 9222. Ubuntu 16.04 provides the era-appropriate shared libraries.
# Pick REVISION as the nearest available Linux_x64 snapshot at/after a milestone's branch base position,
# e.g. 369908 for Chrome 49 and 625920 for Chrome 73 (see https://chromiumdash.appspot.com/branches).
FROM --platform=linux/amd64 ubuntu:16.04
ARG REVISION
ENV DEBIAN_FRONTEND=noninteractive
# the updates pocket is needed for the NSS version required by Chrome 73
RUN apt-get update -qq \
 && apt-get install -y -qq --no-install-recommends \
      ca-certificates wget unzip xvfb socat fonts-liberation \
      libgtk2.0-0 libgtk-3-0 libnss3 libnspr4 libxss1 libasound2 libgconf-2-4 libxtst6 libcups2 libdbus-1-3 \
      libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libpango1.0-0 libcairo2 libxcomposite1 libxcursor1 \
      libxdamage1 libxi6 libxrandr2 libxrender1 libxfixes3 libxext6 libx11-xcb1 libxcb1 libexpat1 libfontconfig1 libexif12 \
 && rm -rf /var/lib/apt/lists/* \
 && wget -q -O /tmp/chrome.zip "https://commondatastorage.googleapis.com/chromium-browser-snapshots/Linux_x64/${REVISION}/chrome-linux.zip" \
 && unzip -q /tmp/chrome.zip -d /opt && rm /tmp/chrome.zip
COPY run.sh /run.sh
EXPOSE 9222
CMD ["/bin/sh", "/run.sh"]
