import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleSignInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    googleSignInSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
    },
    googleSignInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    googleSignOut(state) {
      state.user = null;
    },
  },
});

export const {
  googleSignInRequest,
  googleSignInSuccess,
  googleSignInFailure,
  googleSignOut,
} = authSlice.actions;

export default authSlice.reducer;
