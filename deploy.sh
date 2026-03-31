#!/bin/bash
# Build and deploy to talcytoo.github.io
set -e

npm run build

cd out
git init
git checkout -b main
git add .
git commit -m "Deploy portfolio"
git remote add origin https://talcytoo:${GITHUB_TOKEN}@github.com/talcytoo/talcytoo.github.io.git
git push --force origin main
cd ..
echo "Deployed to https://talcytoo.github.io"
