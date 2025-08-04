import 'react-native-gesture-handler/jestSetup';

// Optional: mock RNGestureHandler to avoid TurboModule error
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

// Optional: mock react-native-reanimated if used
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
