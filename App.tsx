import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, PermissionsAndroid, Platform } from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';

async function ensureNotifPermission() {
  if (Platform.OS !== 'android' || Platform.Version < 33) return true;

  const res = await PermissionsAndroid.request(
    'android.permission.POST_NOTIFICATIONS',
  );

  return res === PermissionsAndroid.RESULTS.GRANTED;
}

export default function App() {
  useEffect(() => {
    ensureNotifPermission();
  }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }} testID="app-root">
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <AuthNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
