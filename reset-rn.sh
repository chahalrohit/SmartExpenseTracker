#!/bin/bash

echo "🔹 Stopping Metro & clearing caches..."

# Stop any running Metro
killall node || true

# Remove node_modules and lock files
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Remove temporary caches
rm -rf /tmp/metro-*
rm -rf /tmp/haste-map-*

# Remove watchman cache (if installed)
watchman watch-del-all || true

# Clear React Native cache
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/haste-*

# Remove Android & iOS build caches
cd android && ./gradlew clean && cd ..
rm -rf ios/build

# Install fresh packages
echo "🔹 Reinstalling packages..."
yarn install

# Reset Metro cache & start
echo "🔹 Starting Metro Bundler with --reset-cache..."
yarn start --reset-cache
