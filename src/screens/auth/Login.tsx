import React, { useEffect } from 'react';
import { SafeAreaView, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '42160912656-oiojninlsa8gnbnvll5b02vk6am0i71i.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Button title="Sign in with Google" onPress={signIn} />
    </SafeAreaView>
  );
};

export default Login;
