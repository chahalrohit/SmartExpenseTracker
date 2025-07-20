// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AuthNavigation />
    </NavigationContainer>
  );
}
