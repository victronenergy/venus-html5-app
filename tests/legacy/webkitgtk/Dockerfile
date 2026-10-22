# WebKitGTK 2.10 from the Ubuntu 16.04 release pocket, the same JavaScriptCore generation as Safari 9 /
# AppleWebKit 601 that some MFD web engines are based on. smoke.py drives a WebKit2 WebView under xvfb.
FROM --platform=linux/amd64 ubuntu:16.04
ENV DEBIAN_FRONTEND=noninteractive
RUN sed -i '/-updates\|-security\|-backports/d' /etc/apt/sources.list \
 && apt-get update -qq \
 && apt-get install -y -qq --no-install-recommends \
      xvfb python3-gi gir1.2-webkit2-4.0 gir1.2-gtk-3.0 fonts-liberation ca-certificates \
 && rm -rf /var/lib/apt/lists/*
COPY webkitgtk/smoke.py /smoke.py
COPY webkitgtk/run.sh /run.sh
COPY probe.js /probe.js
CMD ["/bin/sh", "/run.sh"]
