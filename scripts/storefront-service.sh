#!/bin/bash
set -e
cd /var/www/my-store

# Ensure standalone build has latest public and static assets
cp -rn /var/www/my-store/public /var/www/my-store/.next/standalone/ 2>/dev/null || true
cp -rn /var/www/my-store/.next/static /var/www/my-store/.next/standalone/.next/ 2>/dev/null || true

cd /var/www/my-store/.next/standalone
export PORT=3000
export HOSTNAME=0.0.0.0
export NODE_ENV=production

exec node --env-file-if-exists=/var/www/my-store/.env.local server.js
