const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ 
  target: process.env.TARGET_SITE,
  secure: false,
  changeOrigin: true,
  autoRewrite: true,
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  if (process.env.JSESSIONID && process.env.XSRF_TOKEN) {
    proxyReq.setHeader('cookie', `JSESSIONID=${process.env.JSESSIONID};path=/, atlassian.xsrf.token=${process.env.XSRF_TOKEN};path=/`);
  }
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  proxyRes.headers['cache-control'] = 'max-age=3600';
});

proxy.listen(8000);
	