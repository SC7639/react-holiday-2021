#!/bin/sh
set -e

cd src
cp index.tsx ../index.tsx.bk
cp ssr.tsx index.tsx
rm -rf ../build
npm run build
cp ../index.tsx.bk index.tsx
rm ../index.tsx.bk
node ../scripts/inline-css.js
