#!/bin/bash
set -e
RED=`tput setaf 1 || echo ''`
GREEN=`tput setaf 2 || echo ''`
NC=`tput sgr0 || echo ''`

#===  FORGE  ===================================================================
#
# Builds Forge for production and packages it into
# athilenius/forge:beta
#
# Builds Billet for production and packages it into
# athilenius/billet_session:beta
#
# If all build well, then:
# docker rm -f forge_beta
# docker run                                           \
#            --detach                                  \
#            --env BILLET_IMAGE=billet_session:beta    \
#            --name forge_beta                         \
#            --privileged                              \
#            --publish 5001:80                         \
#            --restart=always                          \
#            -v $(which docker):/bin/docker            \
#            -v /var/run/docker.sock:/run/docker.sock  \
#            athilenius/forge:beta
#
#===============================================================================

echo "${GREEN}-> Building Forge...${NC}"
pushd forge
bash build.sh beta
popd

echo "${GREEN}-> Billet...${NC}"
pushd billet
bash build.sh beta
popd

echo "${GREEN}-> Building went well. Will launch Canarie beta build.${NC}"
echo "${GREEN}-> Removing old Canarie${NC}"
docker rm -f forge_beta

echo "${GREEN}-> Launching Beta build (Canarie)${NC}"
docker run                                           \
           --detach                                  \
           --env BILLET_IMAGE=billet_session:beta    \
           --name forge_beta                         \
           --privileged                              \
           --publish 5001:80                         \
           --restart=always                          \
           -v $(which docker):/bin/docker            \
           -v /var/run/docker.sock:/run/docker.sock  \
           athilenius/forge:beta

