#!/bin/bash

rm *.apk

echo "===== cordova: ok ====="
rm plugins/android.json
rm -rf plugins/cordova-plugin-crosswalk-webview
rm -rf platforms/android
cordova platform add android
cordova build android
cp platforms/android/build/outputs/apk/android-debug.apk ./cordova-test-ok.apk

echo "===== crosswalk: nok ====="
rm plugins/android.json
cordova plugin add cordova-plugin-crosswalk-webview
rm -rf platforms/android
cordova platform add android
cordova build android
cp platforms/android/build/outputs/apk/android-armv7-debug.apk ./cordova-test-nok.apk