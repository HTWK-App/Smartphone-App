#!/bin/bash

export ANDROID_HOME=/home/cordova/android-sdk-linux
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
export PATH=$PATH:/home/cordova/android-sdk-linux/tools:/home/cordova/android-sdk-linux/platform-tools

cd /home/cordova/Smartphone-App/

git pull

cordova platform add android

cordova build android --release

cp /home/cordova/Smartphone-App/platforms/android/ant-build/MainActivity-release-unsigned.apk /home/cordova/APK/HTWKApp-release-unsigned.apk
