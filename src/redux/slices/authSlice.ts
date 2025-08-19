import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

// ✅ Async thunk for Google Sign-In
export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async (_, { rejectWithValue }) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo; // will be payload in fulfilled
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign-in failed');
    }
  },
);

// ✅ Async thunk for Google Sign-Out
export const googleSignOut = createAsyncThunk(
  'auth/googleSignOut',
  async (_, { rejectWithValue }) => {
    try {
      await GoogleSignin.signOut();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign-out failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Sign-In
    builder.addCase(googleSignIn.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      googleSignIn.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      },
    );
    builder.addCase(
      googleSignIn.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    // Sign-Out
    builder.addCase(googleSignOut.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(googleSignOut.fulfilled, state => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(
      googleSignOut.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

export default authSlice.reducer;
