#!/bin/bash
set -e
RED=`tput setaf 1 || echo ''`
GREEN=`tput setaf 2 || echo ''`
NC=`tput sgr0 || echo ''`

#===  FORGE  ===================================================================
#
# Usage: build.sh <channel>
#
# Packages Forge to a docker container. Production builds are always used.
#
# Builds to:
# athilenius/forge:<chennel>
#
#===============================================================================

if [ $# -eq 0  ]; then
  echo "${RED}No arguments given!${NC}"
  exit
fi

rm -rf bin
mkdir bin

pushd src
echo "${GREEN}-> Running 'bower instal' for prod client assets${NC}"
bower install
echo "${GREEN}-> Running 'grunt build:prod' for prod client assets${NC}"
grunt build:prod
popd

# Copy list for needed prod resources
echo "${GREEN}-> Copying srouce to Bin${NC}"
cp -r src/client_prod   \
      src/common        \
      src/package.json  \
      src/server        \
      bin/

pushd bin
echo "${GREEN}-> Building Production NPM modules${NC}"
npm install --production
popd

echo "${GREEN}-> Building Docker Image${NC}"
docker build -t athilenius/forge:$1 .
