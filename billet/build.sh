#!/bin/bash
set -e
RED=`tput setaf 1 || echo ''`
GREEN=`tput setaf 2 || echo ''`
NC=`tput sgr0 || echo ''`

#===  BILLET  ==================================================================
#
# Usage: build.sh <channel>
#
# Packages Billet to a docker container. Developemnt builds are always used (for
# now, that will change)
#
# Builds to:
# athilenius/billet:<chennel>
#
#===============================================================================

if [ $# -eq 0  ]; then
  echo "${RED}No arguments given!${NC}"
  exit
fi

pushd src
echo "${GREEN}-> Building NPM modules${NC}"
npm install --production
popd

echo "${GREEN}-> Building Docker Image${NC}"
docker build -t athilenius/billet:$1 .
