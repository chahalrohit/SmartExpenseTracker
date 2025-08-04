import React, { memo, useEffect } from 'react';
import { Alert, BackHandler, Linking, PermissionsAndroid } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
// import ReactNativeBiometrics from 'react-native-biometrics';
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

  useEffect(() => {
    requestSMSPermission();
  }, []);

  useEffect(() => {
    const subscription = SmsListener.addListener((message: any) => {
      console.log('Received SMS:', message);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  async function requestSMSPermission() {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    ]);

    const receiveSmsStatus = result[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS];
    const readSmsStatus = result[PermissionsAndroid.PERMISSIONS.READ_SMS];

    if (
      receiveSmsStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      readSmsStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      Alert.alert(
        'Permission Required',
        'You should enable SMS permission for the app to work correctly.',
        [
          {
            text: 'OK',
            onPress: () => Linking.openSettings(),
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => BackHandler.exitApp(),
          },
        ],
      );
    }
  }

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
    <SafeAreaView style={styles.container}>
      <CustomImage source={images.splash} style={styles.image} />
    </SafeAreaView>
  );
};

export default memo(Splash);
