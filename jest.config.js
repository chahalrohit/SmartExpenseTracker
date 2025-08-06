module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      [
        '@react-native',
        'react-native',
        'react-redux',
        '@react-navigation',
        '@reduxjs/toolkit',
        'react-clone-referenced-element',
        'react-native-gesture-handler',
        '@react-native-google-signin/google-signin', // ✅ Added
      ].join('|') +
      ')/)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jestSetup.js',
  ],
};
