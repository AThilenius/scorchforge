#!/bin/bash

pushd /etc/billet
NODE_ENV=production nodejs .
popd
