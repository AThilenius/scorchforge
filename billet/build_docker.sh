#!/bin/bash
set -e

echo 'Build NPM modules'
pushd session_host
npm install
popd

echo 'Building Docker Image'
docker build -t athilenius/billet_session .
# docker push athilenius/billet_session
