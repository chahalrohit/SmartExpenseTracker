/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import { name as appName } from './app.json';
import App from './App';
LogBox.ignoreAllLogs();

AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName,
  () => headlessNotificationListener,
);

AppRegistry.registerComponent(appName, () => App);

// MUST be registered early (in index.js), not in a screen:
const headlessNotificationListener = async ({ notification }) => {
  if (!notification) return;
  // notification is a JSON string
  const n = JSON.parse(notification);

  // n.app is the sender package name (not n.packageName)
  // Common SMS apps to filter (adjust for OEM):
  const isSmsApp = [
    'com.google.android.apps.messaging',
    'com.samsung.android.messaging',
    // add more as needed (MIUI, etc.)
  ].includes(n.app);

  const text = n?.text ?? n?.title ?? n?.bigText ?? '';
  if (!isSmsApp || !text) return;

  // simple parse example
  const amount = text.match(/(?:INR|Rs\.?)\s?([\d,]+(?:\.\d{1,2})?)/i)?.[1];
  const merchant = text.match(/(?:at|to)\s+([A-Za-z0-9&\- .'"]{2,50})/i)?.[1];

  console.log('Parsed via headless:', {
    from: n.app,
    amount,
    merchant,
    raw: text,
  });
  // TODO: dispatch to storage/Redux; keep it fast (headless runs outside UI)
};
