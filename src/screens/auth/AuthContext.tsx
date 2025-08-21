// src/auth/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as Keychain from 'react-native-keychain';

type AuthState = {
  token: string | null;
  loading: boolean;
};

type AuthContextValue = {
  token: string | null;
  loading: boolean;
  setToken: (token: string | null) => Promise<void>;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken?: () => Promise<void>; // optional if your backend supports refresh
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function saveTokenSecurely(token: string) {
  await Keychain.setGenericPassword('auth', token, {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    service: 'com.yourapp.auth', // change to your bundle id / service
  });
}

async function getTokenSecurely(): Promise<string | null> {
  const result = await Keychain.getGenericPassword({
    service: 'com.yourapp.auth',
  });
  return result ? result.password || null : null;
}

async function deleteTokenSecurely() {
  await Keychain.resetGenericPassword({ service: 'com.yourapp.auth' });
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({ token: null, loading: true });

  // Bootstrap on first mount: read token from secure storage
  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenSecurely();
        setState({ token, loading: false });
      } catch (e) {
        console.warn('Auth bootstrap failed', e);
        setState({ token: null, loading: false });
      }
    })();
  }, []);

  const setToken = async (token: string | null) => {
    if (token) {
      await saveTokenSecurely(token);
      setState(s => ({ ...s, token }));
    } else {
      await deleteTokenSecurely();
      setState(s => ({ ...s, token: null }));
    }
  };

  const signIn = async (token: string) => {
    // you might also fetch user profile here
    await setToken(token);
  };

  const signOut = async () => {
    await setToken(null);
    // optionally clear other cached data here
  };

  // optional: implement refresh with your API
  const refreshToken = async () => {
    // const newToken = await api.refresh(...)
    // await setToken(newToken)
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      token: state.token,
      loading: state.loading,
      setToken,
      signIn,
      signOut,
      refreshToken,
    }),
    [state.token, state.loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
