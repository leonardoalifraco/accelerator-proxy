const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ 
  target: process.env.TARGET_SITE,
  secure: false,
  changeOrigin: true,
  autoRewrite: true,
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  if (process.env.JSESSIONID) {
    proxyReq.setHeader('cookie', `JSESSIONID=${process.env.JSESSIONID};path=/`);
  }
});

proxy.on('proxyRes', function (proxyRes, req, res) {
  proxyRes.headers['cache-control'] = 'max-age=3600';
});

proxy.listen(8000);
