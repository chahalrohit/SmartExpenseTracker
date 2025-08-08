/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import { name as appName } from './app.json';
LogBox.ignoreAllLogs();

const headlessNotificationListener = async ({ notification }) => {
  if (!notification) return;
  const data = JSON.parse(notification); // lib JSON string deti hai

  // Only SMS apps ko filter karo (device ke hisab se list expand kar sakte ho)
  const smsApps = new Set([
    'com.google.android.apps.messaging', // Google Messages
    'com.samsung.android.messaging',
    'com.oneplus.mms',
    'com.coloros.mms',
  ]);
  if (!smsApps.has(data.app)) return;

  const text = (data.text || data.bigText || '').toString();

  // Yahan apne bank SMS regex lagao (example):
  // "INR 1,234.56 debited ..." -> amount capture
  const amt = text.match(
    /(?:(?:INR|Rs\.?)\s*)?([0-9,]+(?:\.[0-9]{1,2})?)/i,
  )?.[1];
  const merchant = text.match(/at\s+([A-Za-z0-9 &-_]+)\b/i)?.[1];
  const when = new Date(data.time);

  // TODO: Redux store/DB me expense add karo
  //   console.log('TXN:', { amt, merchant, when, raw: text });
};

AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName,
  () => headlessNotificationListener,
);

import App from './App';
AppRegistry.registerComponent(appName, () => App);
