#!/bin/bash
set -e
RED=`tput setaf 1 || echo ''`
GREEN=`tput setaf 2 || echo ''`
NC=`tput sgr0 || echo ''`

#===  FORGE  ===================================================================
#
# Builds Forge for production and packages it into
# athilenius/forge:prod
#
# Builds Billet for production and packages it into
# athilenius/billet:prod
#
# If all builds well, then the production copy of Forge will be replaced
#
#===============================================================================

echo "${GREEN}-> Building Forge [prod]...${NC}"
pushd forge
bash build.sh prod
popd

echo "${GREEN}-> Building Billet [prod]...${NC}"
pushd billet
bash build.sh prod
popd

echo "${GREEN}-> Building went well. Will upgrade production.${NC}"

echo "${GREEN}-> Removing old production build${NC}"
docker rm -f forge_prod || echo 'Continueing'
echo "${GREEN}-> Launching Production build.${NC}"
docker run                                                                     \
           --detach                                                            \
           --env BILLET_IMAGE='athilenius/billet:prod'                         \
           --env MONGO_TARGET='172.17.0.1:27017'                               \
           --env NODE_ENV='production'                                         \
           --env RUN_TYPE='prod'                                               \
           --env PUBLISHED_PORT=5000                                           \
           --name forge_prod                                                   \
           --privileged                                                        \
           --publish 5000:80                                                   \
           --restart=always                                                    \
           -v $(which docker):/bin/docker                                      \
           -v /var/run/docker.sock:/run/docker.sock                            \
           athilenius/forge:prod

echo "${GREEN}-> Production upgrade compleate.${NC}"
