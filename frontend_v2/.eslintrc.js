module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
  },

  env: {
    node: true,
  },

  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
  ],

  rules: {
    'no-console': 0,
  },
};
