#!/bin/bash
set -e
RED=`tput setaf 1 || echo ''`
GREEN=`tput setaf 2 || echo ''`
NC=`tput sgr0 || echo ''`

#===  FORGE  ===================================================================
#
# Usage: build.sh <channel>
#
# Packages Forge to a docker container. Both production and dev assets are
# bundled into the final build and switched by NODE_ENV
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
echo "${GREEN}-> Running 'npm install' for prod client assets${NC}"
rm -rf ~/.npm && npm cache clear
npm install
echo "${GREEN}-> Running 'bower install' for prod client assets${NC}"
bower cache clean
bower install
echo "${GREEN}-> Running 'grunt build' for dev client assets${NC}"
PORT=9000 grunt build
echo "${GREEN}-> Running 'grunt build:prod' for prod client assets${NC}"
PORT=9000 grunt build:prod
popd

# Copy list for needed prod resources
echo "${GREEN}-> Copying srouce to Bin${NC}"
cp -r src/client        \
      src/client_prod   \
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
