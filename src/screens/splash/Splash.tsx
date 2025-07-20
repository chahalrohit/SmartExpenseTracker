import React, { useEffect, memo } from 'react';
import { StatusBar, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../assets/images';
import CustomImage from '../../components/Image/CustomImage';
import styles from './Splash.styles';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

interface Props {
  navigation: any;
}

const Splash = ({ navigation }: Props) => {
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    const timer = setTimeout(() => {
      // checkBiometrics();
      navigation.navigate('onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    requestSMSPermission();
  }, []);

  async function requestSMSPermission() {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
  }

  function checkBiometrics() {
    // Check biometric availability
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const { available, biometryType } = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
        biometricPrompt();
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
        biometricPrompt();
      } else {
        console.log('Biometrics not supported');
      }
    });
  }

  async function biometricPrompt() {
    rnBiometrics
      .simplePrompt({ promptMessage: 'Confirm your identity' })
      .then(resultObject => {
        const { success } = resultObject;
        if (success) {
          console.log('Biometric authentication successful');
        } else {
          console.log('User cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('Biometrics failed');
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomImage source={images.splash} style={styles.image} />
    </SafeAreaView>
  );
};

export default memo(Splash);
