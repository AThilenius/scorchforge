#!/bin/bash
set -e
RED=`tput setaf 1`
GREEN=`tput setaf 2`
NC=`tput sgr0`

#===  NGINX  ===================================================================
#
# Usage: build.sh
#
# Packages NGINX for production only. There is no point in running a reverse
# proxy (mainly used for SSL termination) in dev, and beta will be behind the
# same PROD proxy.
#
# Builds to:
# athilenius/nginx:prod
#
#===============================================================================

echo "${GREEN}-> Building Docker Image${NC}"
docker build -t athilenius/nginx:prod .
