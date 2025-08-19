import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignIn } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import styles from './Login.styles';
import CustomText from '../../components/CustomText/CustomText';
import { colors } from '../../theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Props {
  navigation: any;
}

const Login = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '692246726913-fdsc36obdnk94bc9at27fsc857nts79b.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User info:', user);
      navigation.navigate('home');
    }
  }, [user]);

  return (
    <SafeAreaProvider style={styles.container} testID="login-screen">
      <Button
        title={loading ? 'Signing in...' : 'Sign in with Google'}
        onPress={() => dispatch(googleSignIn())}
        disabled={loading}
      />
      {error && (
        <CustomText style={{ color: colors.redColor }}>{error}</CustomText>
      )}
    </SafeAreaProvider>
  );
};

export default Login;
