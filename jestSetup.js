// 1️⃣ Import Gesture Handler Jest setup
import 'react-native-gesture-handler/jestSetup';

// 2️⃣ Mock Gesture Handler to support testID
jest.mock('react-native-gesture-handler', () => {
  const ActualGestureHandler = jest.requireActual(
    'react-native-gesture-handler',
  );
  return {
    ...ActualGestureHandler,
    // Forward props to preserve testID
    GestureHandlerRootView: ({ children, ...props }) => (
      <div {...props}>{children}</div>
    ),
  };
});

// 3️⃣ Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// 4️⃣ Mock Google Sign-In (ESM package)
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn().mockResolvedValue({
      user: { name: 'Test User', email: 'test@example.com' },
    }),
    signOut: jest.fn().mockResolvedValue(),
    revokeAccess: jest.fn().mockResolvedValue(),
    isSignedIn: jest.fn().mockResolvedValue(false),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
}));
