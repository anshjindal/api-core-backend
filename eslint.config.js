// eslint.config.js
const js = require('@eslint/js');

module.exports = [
  {
    files: ['index.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        // Add global variables you're using
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
        process: 'readonly'
      }
    },
    rules: {
      // Recommended base rules with some relaxed settings
      'no-unused-vars': 'warn',
      'no-console': 'off', // Allow console logs
      'no-undef': 'error',
    }
  }
];