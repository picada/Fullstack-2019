#!/bin/sh
npm run build
rm -rf ../../../Fullstack-2019-Part3/build
cp -r build ../../../Fullstack-2019-Part3/
