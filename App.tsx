import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {
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
