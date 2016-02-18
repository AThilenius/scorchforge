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
# athilenius/billet:beta
#
# If all builds well, then the canery builds will be launched.
#
#===============================================================================

echo "${GREEN}-> Building Forge [beta]...${NC}"
pushd forge
bash build.sh beta
popd

echo "${GREEN}-> Building Billet [beta, dev]...${NC}"
pushd billet
bash build.sh beta
bash build.sh dev
popd

echo "${GREEN}-> Building went well. Will launch Canarie beta build.${NC}"

echo "${GREEN}-> Removing old Canarie${NC}"
docker rm -f forge_beta || echo 'Continueing'
echo "${GREEN}-> Launching Beta build (Canarie)${NC}"
docker run                                                                     \
           --detach                                                            \
           --env BILLET_IMAGE='athilenius/billet:beta'                         \
           --env MONGO_TARGET='172.17.0.1:27018'                               \
           --env NODE_ENV='production'                                         \
           --env RUN_TYPE='beta'                                               \
           --env PUBLISHED_PORT=5001                                           \
           --name forge_beta                                                   \
           --privileged                                                        \
           --publish 5001:80                                                   \
           --restart=always                                                    \
           -v $(which docker):/bin/docker                                      \
           -v /var/run/docker.sock:/run/docker.sock                            \
           athilenius/forge:beta

echo "${GREEN}-> Removing old Dev${NC}"
docker rm -f forge_dev || echo 'Continueing'
echo "${GREEN}-> Launching Dev build (Secured, non-minified)${NC}"
docker run                                                                     \
           --detach                                                            \
           --env BILLET_IMAGE='athilenius/billet:dev'                          \
           --env MONGO_TARGET='172.17.0.1:27019'                               \
           --env RUN_TYPE='dev'                                                \
           --env PUBLISHED_PORT=5002                                           \
           --name forge_dev                                                    \
           --privileged                                                        \
           --publish 5002:80                                                   \
           --restart=always                                                    \
           -v $(which docker):/bin/docker                                      \
           -v /var/run/docker.sock:/run/docker.sock                            \
           athilenius/forge:beta
