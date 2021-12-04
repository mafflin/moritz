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
    'import/no-cycle': 0,
    'no-console': 0,
    'no-debugger': 0,
    'vue/no-deprecated-slot-attribute': 0,
  },
};
