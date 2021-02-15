module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    // "@vue/prettier",
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': [2, 'single'], // https://eslint.org/docs/2.0.0/rules/quotes
    'semi': [2, 'never'], // https://eslint.org/docs/2.0.0/rules/semi
    // https://github.com/ElemeFE/eslint-config-elemefe/blob/master/rules.js
    // // https://cn.eslint.org/docs/rules/
    'indent' : [1, 2, { 'SwitchCase': 1 }]
  }
}
