// eslint.config.cjs
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');
const prettier = require('eslint-plugin-prettier');

// ✅ Add this import for jest plugin
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
      globals: {
        ...globals.browser, // browser-like globals (fetch, setTimeout, etc.)
        ...globals.node, // node-like globals
        console: 'readonly', // explicitly allow console
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
  // ✅ Add Jest support
  {
    files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', 'jestSetup.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    }, // allow require() only for *.test.tsx
    languageOptions: {
      globals: {
        ...globals.jest, // ✅ Jest globals like "jest", "describe", "it"
      },
    },
  },
];
