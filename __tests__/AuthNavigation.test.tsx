import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import AuthNavigation from '../src/navigation/AuthNavigation';

jest.mock('../src/screens/splash/Splash', () => {
  const { View, Text } = require('react-native');
  const MockSplash = () => {
    return (
      <View testID="splash-screen">
        <Text>Splash Screen</Text>
      </View>
    );
  };
  return MockSplash;
});

jest.mock('../src/screens/home/Home', () => {
  const { View, Text } = require('react-native');
  const MockHome = () => (
    <View testID="home-screen">
      <Text>Home Screen</Text>
    </View>
  );
  return MockHome;
});

jest.mock('../src/screens/onboarding/Onboarding', () => {
  const { View, Text } = require('react-native');
  const MockOnboarding = () => (
    <View testID="onboarding-screen">
      <Text>Onboarding Screen</Text>
    </View>
  );
  return MockOnboarding;
});

jest.mock('../src/screens/auth/Login', () => {
  const { View, Text } = require('react-native');
  const MockLogin = () => (
    <View testID="login-screen">
      <Text>Login Screen</Text>
    </View>
  );
  return MockLogin;
});

// jest.mock('../src/screens/onboarding/Onboarding', () => {
//   const React = require('react');
//   const { View } = require('react-native');
//   return jest.fn(() =>
//     React.createElement(View, { testID: 'onboarding-screen' }),
//   );
// });

// jest.mock('../src/screens/auth/Login', () => {
//   const React = require('react');
//   const { View } = require('react-native');
//   return jest.fn(() => React.createElement(View, { testID: 'login-screen' }));
// });

// jest.mock('../src/screens/home/Home', () => {
//   const React = require('react');
//   const { View } = require('react-native');
//   return jest.fn(() => React.createElement(View, { testID: 'home-screen' }));
// });

describe('AuthNavigation', () => {
  const renderWithNavigation = () =>
    render(
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>,
    );

  it('renders the Splash screen initially', () => {
    const { getByTestId } = renderWithNavigation();
    expect(getByTestId('splash-screen')).toBeTruthy();
  });

  it('renders only the active screen initially', () => {
    const { queryByTestId } = renderWithNavigation();
    expect(queryByTestId('splash-screen')).toBeTruthy();
    expect(queryByTestId('onboarding-screen')).toBeNull();
    expect(queryByTestId('login-screen')).toBeNull();
    expect(queryByTestId('home-screen')).toBeNull();
  });
});
