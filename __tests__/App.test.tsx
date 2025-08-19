import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

// Create mock store
const mockStore = configureStore([]);
const store = mockStore({
  auth: { isLoggedIn: false },
});

// Mock Navigation
jest.mock('../src/navigation/AuthNavigation', () => {
  const React = require('react');
  const { View } = require('react-native');
  return jest.fn(() =>
    React.createElement(View, { testID: 'auth-navigation' }),
  );
});

describe('App Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(getByTestId('app-root')).toBeTruthy();
  });

  it('renders NavigationContainer and AuthNavigation', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(getByTestId('auth-navigation')).toBeTruthy();
  });
});
