#!/bin/bash

mkdir --parent gen-files

TIMESTAMP=$(date +%y%m%d.%H.%M%S)

function GlobJsToIndex {
  find $1 -name *.js | while read line; do \
    echo "    <script src=\"$line\"></script>" >> index.html; \
  done
  echo "" >> index.html
}

function GlobCssToIndex {
  find $1 -name *.css | while read line; do \
    echo "    <link rel=\"stylesheet\" href=\"$line\" />" >> index.html; \
  done
  echo "" >> index.html
}

echo 'Creating a development index.html file'
rm -rf index.html
cat << EOM >> index.html
<!doctype html>
<html ng-app="app" ng-controller="loginController"
      class="{{\$root.htmlClass ? \$root.htmlClass : 'default-body'}}">
<head><title ng-bind="\$root.title || 'Scorch'"></title>
    <link rel="shortcut icon" href="assets/flame-512.png" />
    <link href="build/_bower.css" rel="stylesheet">

    <script src="build/compiled_libs.js"></script>
EOM
echo "    <script>var FORGE_VERSION=\"${TIMESTAMP}\";</script>" >> index.html
echo "" >> index.html

GlobCssToIndex app
GlobJsToIndex app

cat << EOM >> index.html
    <base href="/">
</head>
<body class="{{\$root.bodyClass ? \$root.bodyClass : 'default-body'}}">
<div ui-view></div>
</body></html>
EOM

