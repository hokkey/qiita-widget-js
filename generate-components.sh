#!/usr/bin/env bash

dest="./src/view/components/"
sassFile="_component.scss"
json=$(cat conf/components.json)
len=$(echo $json | jq length)

function main() {
  for i in $( seq 0 $(($len - 1)) ); do
    component=$(echo $json | jq -r .[$i])
    if [ -e "./$component" ]; then
      echo "$component is already available."
    else
      ../../../node_modules/.bin/yo ejsbemplate $component
      echo "@import '"$component/$component"';" >> "$sassFile"
    fi
  done
}

cd $dest
main
