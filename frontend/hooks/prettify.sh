#!/usr/bin/env bash

function isSome() {
  a=("$@")
  ((last_idx=${#a[@]} - 1))
  file=${a[last_idx]}
  unset a[last_idx]

  for i in "${a[@]}"; do
    if [[ "$i" == "$file" ]];
    then
      return 0;
    else
      continue;
    fi
  done
  return 1;
}

paths=($(git diff --name-only --diff-filter=AM));

npm run prettier_write;

for prettified in $(git diff --name-only --diff-filter=AMT)
do
  if isSome "${paths[@]}" "$prettified"
  then
    continue;
  else
    echo "differ $prettified";
    cd ..;
    $(git add $prettified);
    cd ./frontend;
  fi
done

