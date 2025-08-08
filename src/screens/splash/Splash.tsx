import React, { memo, useEffect, useRef, useState } from 'react';
// import ReactNativeBiometrics from 'react-native-biometrics';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
// import SmsAndroid from 'react-native-get-sms-android';
import { AppState, AppStateStatus } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../assets/images';
import CustomImage from '../../components/Image/CustomImage';
import styles from './Splash.styles';

interface Props {
  navigation: any;
}

const Splash = ({ navigation }: Props) => {
  // const rnBiometrics = new ReactNativeBiometrics();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState<'authorized' | 'denied' | 'unknown'>(
    'unknown',
  );

  const askedOnceRef = useRef(false); // loop रोकने के लिए

  const checkPermission = async () => {
    try {
      const s = await RNAndroidNotificationListener.getPermissionStatus();
      setStatus(s as typeof status);
      return s; // ← IMPORTANT
    } catch (e) {
      return 'unknown';
    }
  };

  useEffect(() => {
    (async () => {
      const current = await checkPermission();
      if (current !== 'authorized' && !askedOnceRef.current) {
        askedOnceRef.current = true;
        try {
          await RNAndroidNotificationListener.requestPermission(); // open settings
          setTimeout(checkPermission, 800); // state refresh
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);

  // When app returns from settings (foreground), re-check
  useEffect(() => {
    const onChange = async (state: AppStateStatus) => {
      if (state === 'active') {
        await checkPermission();
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
    <SafeAreaView style={styles.container} testID="splash-screen">
      <CustomImage source={images.splash} style={styles.image} />
    </SafeAreaView>
  );
};

export default memo(Splash);
