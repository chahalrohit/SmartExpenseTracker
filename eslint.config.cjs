// eslint.config.cjs
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');
const prettier = require('eslint-plugin-prettier');

// Import Airbnb configs
const airbnbBase = require('eslint-config-airbnb/base');
const airbnbTypescript = require('eslint-config-airbnb-typescript');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    plugins: {
      react,
      'react-native': reactNative,
      prettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'], // Only for TS files
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    // Merge Airbnb + Airbnb TS rules manually
    rules: {
      ...airbnbBase.rules,
      ...airbnbTypescript.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['*.js', '*.cjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // allow require in Node configs
    },
  },
  {
    plugins: {
      react,
      'react-native': reactNative,
      prettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      react,
      'react-native': reactNative,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-native/no-inline-styles': 'off',
    },
  },
  {
    ignores: [
      'node_modules',
      'android',
      'ios',
      'dist',
      'build',
      '*.config.js',
      '.prettierrc.js',
    ],
  },
];
