// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} testID="app-root">
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <AuthNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
