const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/3cx', createProxyMiddleware({
  target: 'https://pbx.mdt.gov.tt:5001',
  changeOrigin: true,
  pathRewrite: { '^/3cx': '' },
  onProxyRes: (proxyRes) => {
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['content-security-policy-report-only'];
  }
}));

app.listen(3000, () => {
  console.log('3CX CSP-stripping proxy is live on port 3000');
});
