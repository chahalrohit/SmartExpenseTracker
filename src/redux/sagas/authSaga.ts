import { call, put, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  googleSignInRequest,
  googleSignInSuccess,
  googleSignInFailure,
  googleSignOutRequest,
  googleSignOutSuccess,
  googleSignOutFailure,
} from '../slices/authSlice';

// Helper type for the Google user result
type GoogleUser = Awaited<ReturnType<typeof GoogleSignin.signIn>>;

function* handleGoogleSignIn(): SagaIterator {
  try {
    yield call([GoogleSignin, GoogleSignin.hasPlayServices]);
    const userInfo = (yield call([
      GoogleSignin,
      GoogleSignin.signIn,
    ])) as GoogleUser;

    yield put(googleSignInSuccess(userInfo));
  } catch (err: any) {
    yield put(googleSignInFailure(err?.message ?? 'Sign-in failed'));
  }
}

function* handleGoogleSignOut(): SagaIterator {
  try {
    yield call([GoogleSignin, GoogleSignin.signOut]);
    yield put(googleSignOutSuccess());
  } catch (err: any) {
    yield put(googleSignOutFailure(err?.message ?? 'Sign-out failed'));
  }
}

export default function* authSaga(): SagaIterator {
  yield takeLatest(googleSignInRequest.type, handleGoogleSignIn);
  yield takeLatest(googleSignOutRequest.type, handleGoogleSignOut);
}
