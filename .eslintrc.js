module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-use-before-define': 'off',
    'newline-before-return': ['error'],
    'react-hooks/exhaustive-deps': 0,
    'react/function-component-definition': 0,
    'arrow-body-style': [1, 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'eslint-disable-next-line': 'off',
    'prettier/prettier': 'error',
    'import/newline-after-import': ['error'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'export' },
    ],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
