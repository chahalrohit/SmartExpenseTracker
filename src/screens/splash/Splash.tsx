import React, { memo, useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
// import ReactNativeBiometrics from 'react-native-biometrics';
import RNANL from 'react-native-android-notification-listener';
import SmsAndroid from 'react-native-get-sms-android';
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

  useEffect(() => {
    const timer = setTimeout(async () => {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      if (granted) {
        navigation.navigate('onboarding');
        SmsAndroid.list(
          JSON.stringify({ box: 'inbox', maxCount: 5 }),
          (fail: any) => {
            console.log('Failed:', fail);
          },
          (count: any, smsList: any) => {
            const messages = JSON.parse(smsList);
            console.log('Messages:', messages);
          },
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const refreshStatus = useCallback(async () => {
    try {
      const s = await RNANL.getPermissionStatus();
      setStatus(s as any);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  useEffect(() => {
    const subscription = SmsListener.addListener((message: any) => {
      console.log('Received SMS:', message);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
