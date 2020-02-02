const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  devServer: {
    proxy: {
      '^/api|^/rails': {
        target: 'http://backend:3000',
      },
    },
  },
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
  },
};
