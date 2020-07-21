module.exports = {
  extends: ['airbnb-typescript-prettier'],
  plugins: ['import-order-autofix/order'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/self-closing-comp': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  }
};
