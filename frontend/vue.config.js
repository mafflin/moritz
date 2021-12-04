module.exports = {
  devServer: {
    proxy: {
      '^/cable': {
        target: 'ws://backend:3000',
        ws: true,
      },
      '^/api|^/rails': {
        target: 'http://backend:3000',
      },
    },
  },
};
