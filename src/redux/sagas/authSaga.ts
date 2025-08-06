import { call, put, takeLatest } from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  googleSignInRequest,
  googleSignInSuccess,
  googleSignInFailure,
  googleSignOutRequest,
  googleSignOutSuccess,
  googleSignOutFailure,
} from '../slices/authSlice';

function* handleGoogleSignIn(): Generator<any, void, any> {
  try {
    yield call([GoogleSignin, 'hasPlayServices']);
    const userInfo = yield call([GoogleSignin, 'signIn']);
    yield put(googleSignInSuccess(userInfo));
  } catch (error: any) {
    yield put(googleSignInFailure(error.message || 'Sign-in failed'));
  }
}

function* handleGoogleSignOut(): Generator<any, void, any> {
  try {
    yield call([GoogleSignin, 'signOut']);
    yield put(googleSignOutSuccess());
  } catch (error: any) {
    yield put(googleSignOutFailure(error.message || 'Sign-out failed'));
  }
}

export default function* authSaga() {
  yield takeLatest(googleSignInRequest.type, handleGoogleSignIn);
  yield takeLatest(googleSignOutRequest.type, handleGoogleSignOut);
}
