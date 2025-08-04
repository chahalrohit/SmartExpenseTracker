import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock AuthNavigation safely
jest.mock('../src/navigation/AuthNavigation', () => {
  return () => <div testID="auth-navigation" />;
});

describe('App Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app-root')).toBeTruthy();
  });

  it('renders NavigationContainer and AuthNavigation', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('auth-navigation')).toBeTruthy();
  });
});
