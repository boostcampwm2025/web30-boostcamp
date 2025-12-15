import js from '@eslint/js';

export default [
  {
    ignores: ['dist', 'build', 'node_modules', '*.config.js', '*.config.mjs', 'coverage'],
  },
  js.configs.recommended,
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-template': 'warn',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
