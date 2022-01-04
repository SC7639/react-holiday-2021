#!/bin/sh
set -e

# If noode_modules folder doesn't exist then in wrong folder to run this script
if [ ! -d ./node_modules ]
then
    echo "To build the server you must be in the root of the project"
    exit
fi

mkdir -p ./server/build/public ./server/build/server ./server/build/src
cp -R ./build/* ./server/build/public/

echo "creating a nodejs build..."
NODE_ENV=production npx babel server --out-dir server/build/server --config-file ./server/.babelrc --ignore /server/build/  --extensions ".ts,.tsx,.js" 
echo "create a nodejs build of src"
NODE_ENV=production npx babel src --out-dir server/build/src --config-file ./server/.babelrc --ignore **/*.test.* --extensions ".ts,.tsx,.js"
echo "update path of `@material-ui` in node_modules/@skiddle/"
NODE_ENV=production npx babel node_modules/@skiddle/ --out-dir node_modules/@skiddle/ --config-file ./server/.babelrc --extensions ".js"

# This need changing from .env.development to .env before production
if [ -f .env ]
then
    cp .env ./server/build/server/.env
fi

echo "Built files are located at ./server/build"
