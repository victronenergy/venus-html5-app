#!/bin/bash

# TODO: this code can be removed after migrating to webpack v5
# Introduced in Node.js v17 alongside support for OpenSSL 3.0, the --openssl-legacy-provider
# flag tells Node.js to revert to OpenSSL 3.0's legacy provider. This allows to run webpack v4
# that still create hashes with legacy cryptographic algorithms like MD4.

# Get only major number of Node.js version
VERSION=`node -v | while IFS=. read a b; do echo "$a"; done | grep -o -E "\d*"`

# Apply --openssl-legacy-provider option only for node v17 and higher
if [ $VERSION -gt "16" ]
then
  export NODE_OPTIONS=--openssl-legacy-provider
fi
