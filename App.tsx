import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AuthNavigation from './src/navigation/AuthNavigation';
import store from './src/redux/store';
// import ErrorBoundary from './src/utils/ErrorBoundary';
import ErrorBoundary from 'react-native-error-boundary';
import { scale } from 'react-native-size-matters';
import { AuthProvider } from './src/screens/auth/AuthContext';

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

  const ErrorFallback = ({
    error,
    resetError,
  }: {
    error: any;
    resetError: any;
  }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', marginBottom: scale(10) }}>
          {error.message}
        </Text>
        <Button onPress={resetError} title="Try Again" />
      </View>
    );
  };

  const errorHandler = (error: Error, stackTrace: string) => {
    console.error(
      'Error: ' + error.message + '\n' + 'stackTrace Error' + stackTrace,
    );
  };

  return (
    <ErrorBoundary
      onError={errorHandler}
      FallbackComponent={ErrorFallback}
      // fallback={
      //   <View
      //     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      //   >
      //     <Text>This is Error Boundaries Message</Text>
      //     <Text style={{ color: colors.redColor }}>Something went wrong.</Text>
      //   </View>
      // }
    >
      <AuthProvider>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }} testID="app-root">
            <NavigationContainer>
              <StatusBar barStyle="dark-content" />
              <AuthNavigation />
            </NavigationContainer>
          </GestureHandlerRootView>
        </Provider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
