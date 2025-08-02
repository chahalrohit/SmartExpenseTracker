// In App.js in a new project

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Onboarding from '../screens/onboarding/Onboarding';
import Splash from '../screens/splash/Splash';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();

const CoreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};
export default CoreNavigation;
