// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import React, { useEffect } from 'react';
// import { Button, SafeAreaView } from 'react-native';
// import styles from './Login.styles';

// interface Props {
//   navigation: any;
// }

// const Login = ({ navigation }: Props) => {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId:
//         '692246726913-fdsc36obdnk94bc9at27fsc857nts79b.apps.googleusercontent.com',
//       offlineAccess: true,
//     });
//   }, []);

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log('Google Signin UserInfo -->> ', userInfo);
//       navigation.navigate('home');
//     } catch (e: any) {
//       console.log('nativeStatusCode →', e.nativeStatusCode); // 17 = SIGN_IN_FAILED
//       console.log('statusCode      →', e.statusCode); // ditto
//       console.log('message         →', e.message);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container} testID="login-screen">
//       <Button title="Sign in with Google" onPress={signIn} />
//     </SafeAreaView>
//   );
// };

// export default Login;
import React, { useEffect } from 'react';
import { Button, SafeAreaView } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import {
  googleSignInRequest,
  googleSignInSuccess,
  googleSignInFailure,
} from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import styles from './Login.styles';
import CustomText from '../../components/CustomText/CustomText';
import { colors } from '../../theme';

interface Props {
  navigation: any;
}

const Login = ({ navigation }: Props) => {
  const dispatch = useDispatch();
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
      console.log('userInfo ==>> ', JSON.stringify(user));
      navigation.navigate('home');
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      dispatch(googleSignInRequest());
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(googleSignInSuccess(userInfo));
    } catch (e: any) {
      dispatch(googleSignInFailure(e.message || 'Sign-in failed'));
    }
  };

  return (
    <SafeAreaView style={styles.container} testID="login-screen">
      <Button
        title={loading ? 'Signing in...' : 'Sign in with Google'}
        onPress={handleSignIn}
        disabled={loading}
      />
      {error && (
        <CustomText style={{ color: colors.redColor }}>{error}</CustomText>
      )}
    </SafeAreaView>
  );
};

export default Login;
