import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Button, SafeAreaView } from 'react-native';

const Login = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '889232190343-rm5u6p0mgt4tivsd4ifh1lfccerp2qqu.apps.googleusercontent.com',
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
