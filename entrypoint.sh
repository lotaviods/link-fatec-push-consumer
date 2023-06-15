#!/bin/bash

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/

pm2-runtime start "bash -c 'ts-node ./src/index.ts'"
