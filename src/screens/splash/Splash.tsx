/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
// import ReactNativeBiometrics from 'react-native-biometrics';
// import SmsAndroid from 'react-native-get-sms-android';
import { Alert, AppState, AppStateStatus } from 'react-native';
import {
  checkNotifications,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import images from '../../assets/images';
import CustomImage from '../../components/Image/CustomImage';
import styles from './Splash.styles';

interface Props {
  navigation: any;
}

const Splash = ({ navigation }: Props) => {
  // const rnBiometrics = new ReactNativeBiometrics();

  const [status, setStatus] = useState<'authorized' | 'denied' | 'unknown'>(
    'unknown',
  );

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    // First, check the current notification permission status
    const { status, settings } = await checkNotifications();

    if (status === RESULTS.GRANTED) {
      setStatus('authorized');
      console.log('Notification permission already granted');
      return true;
    }

    if (status === RESULTS.BLOCKED) {
      Alert.alert(
        'Notification Permission',
        'Notification permission is blocked. Please enable it from settings.',
        [
          {
            text: 'Go to Settings',
            onPress: () => {
              // openSettings method can be called here if you want to open settings screen
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
      return false;
    }

    if (status === RESULTS.DENIED) {
      // Request notification permission
      // On Android 13+ you need to target SDK 33 to request at runtime
      const { status: newStatus, settings: newSettings } =
        await requestNotifications(['alert', 'sound']);
      if (newStatus === RESULTS.GRANTED) {
        console.log('Notification permission granted');
        setStatus('authorized');
        return true;
      } else {
        console.log('Notification permission denied');
        return false;
      }
    }

    return false;
  };

  // When app returns from settings (foreground), re-check
  useEffect(() => {
    const onChange = async (state: AppStateStatus) => {
      if (state === 'active') {
        await requestNotificationPermission();
      }
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  // Navigate only when authorized
  useEffect(() => {
    if (status === 'authorized') {
      navigation.replace('onboarding');
    }
  }, [status, navigation]);

  // function checkBiometrics() {
  //   // Check biometric availability
  //   rnBiometrics.isSensorAvailable().then(resultObject => {
  //     const { available, biometryType } = resultObject;

  //     if (available && biometryType === BiometryTypes.TouchID) {
  //       console.log('TouchID is supported');
  //       biometricPrompt();
  //     } else if (available && biometryType === BiometryTypes.FaceID) {
  //       console.log('FaceID is supported');
  //     } else if (available && biometryType === BiometryTypes.Biometrics) {
  //       console.log('Biometrics is supported');
  //       biometricPrompt();
  //     } else {
  //       console.log('Biometrics not supported');
  //     }
  //   });
  // }

  // async function biometricPrompt() {
  //   rnBiometrics
  //     .simplePrompt({ promptMessage: 'Confirm your identity' })
  //     .then(resultObject => {
  //       const { success } = resultObject;
  //       if (success) {
  //         console.log('Biometric authentication successful');
  //       } else {
  //         console.log('User cancelled biometric prompt');
  //       }
  //     })
  //     .catch(() => {
  //       console.log('Biometrics failed');
  //     });
  // }

  return (
    <SafeAreaProvider style={styles.container} testID="splash-screen">
      <CustomImage source={images.splash} style={styles.image} />
    </SafeAreaProvider>
  );
};

export default memo(Splash);
