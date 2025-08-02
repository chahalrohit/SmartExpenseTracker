// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthNavigation from './src/navigation/AuthNavigation';
import { colors } from './src/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.primaryColor}
        />
        <AuthNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
