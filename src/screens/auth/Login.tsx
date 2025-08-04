import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Button, SafeAreaView } from 'react-native';
import styles from './Login.styles';

interface Props {
  navigation: any;
}

const Login = ({ navigation }: Props) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '692246726913-fdsc36obdnk94bc9at27fsc857nts79b.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Signin UserInfo -->> ', userInfo);
      navigation.navigate('home');
    } catch (e: any) {
      console.log('nativeStatusCode →', e.nativeStatusCode); // 17 = SIGN_IN_FAILED
      console.log('statusCode      →', e.statusCode); // ditto
      console.log('message         →', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} testID="login-screen">
      <Button title="Sign in with Google" onPress={signIn} />
    </SafeAreaView>
  );
};

export default Login;
