#!/bin/bash

rm *.apk

echo "===== vuejs ====="
rm plugins/android.json
rm -rf plugins/cordova-plugin-crosswalk-webview
rm -rf platforms/android
cordova platform add android
cordova build android
cp platforms/android/build/outputs/apk/android-debug.apk ./cordova-test-vuejs.apk

echo "===== crosswalk + vuejs ====="
rm plugins/android.json
cordova plugin add cordova-plugin-crosswalk-webview
rm -rf platforms/android
cordova platform add android
cordova build android
cp platforms/android/build/outputs/apk/android-armv7-debug.apk ./cordova-test-vuejs-crosswalk.apk