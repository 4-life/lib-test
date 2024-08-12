import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginRequireExplicitGenerics from 'eslint-plugin-require-explicit-generics';


export default [
  { files: ['**/*.{ts,tsx}'] },
  { ignores: ['mocks', 'dist'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,

  {
    plugins: {
      'require-explicit-generics': pluginRequireExplicitGenerics,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.ts'] }],
      'indent': ['error', 2, { 'SwitchCase': 1, 'ObjectExpression': 1, 'ImportDeclaration': 1, 'ignoredNodes': ['VariableDeclaration[declarations.length=0]'] }],
      'jsx-quotes': ['error', 'prefer-double'],
      'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
      '@typescript-eslint/explicit-function-return-type': ['error', { 'allowExpressions': true, 'allowTypedFunctionExpressions': true }],
      'no-case-declarations': 0,
      '@typescript-eslint/camelcase': 0,
      'no-trailing-spaces': ['error'],
      'curly': ['error'],
      'eqeqeq': ['error'],
      'no-alert': ['error'],
      'no-eq-null': ['error'],
      '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true, 'argsIgnorePattern': '^_', 'args': 'all' }],
      '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': true }],
      'object-curly-spacing': ['error', 'always'],
      'space-before-blocks': ['error'],
      'arrow-spacing': ['error'],
      'array-callback-return': 'error',
      'spaced-comment': ['error', 'always'],
      'no-console': 'error',
      'no-mixed-operators': 'error',
      'max-len': ['error', { 'code': 300 }],
      'one-var': ['error', 'never'],
      'no-unreachable': 'error',
      'semi': 'error',
      'default-param-last': 'off',
      'react/require-default-props': 'off',
      'import/no-extraneous-dependencies': 0,
      '@typescript-eslint/no-empty-function': 'error',
      'require-explicit-generics/require-explicit-generics': ['error', ['useState']],
      'no-await-in-loop': 0,
      'no-plusplus': 0,
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        2,
        {
          'namedComponents': 'function-declaration',
          'unnamedComponents': 'arrow-function'
        }
      ]
    }
  }
];
