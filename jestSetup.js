import 'react-native-gesture-handler/jestSetup';

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

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
