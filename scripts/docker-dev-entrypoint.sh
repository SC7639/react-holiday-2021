#!/bin/sh

# Create symlink for the current working directory outside of docker for bit.dev
mkdir -p $SYMLINK
ln -s /app/ $SYMLINK$PROJECT_FOLDER

npm run start-server