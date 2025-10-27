#!/bin/bash

# Set Android environment variables
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/emulator

# Create Android local.properties if it doesn't exist
if [ ! -f android/local.properties ]; then
    echo "sdk.dir=$ANDROID_HOME" > android/local.properties
    echo "Created android/local.properties"
fi

# Check if emulator is running
if ! adb devices | grep -q "device$"; then
    echo "Starting Android emulator..."
    emulator -avd Pixel_6a_API_30 -no-audio &
    sleep 10
fi

# Clean and build
echo "Building Android app..."
npx expo run:android