const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api/': '/',
        }, // remove /api from the start of the URL
      }),
  );
};
