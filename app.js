const express = require('express');
const app = express();
const helmet = require('helmet');
const { createProxyMiddleware } = require('http-proxy-middleware');
// let proxy = require('express-http-proxy'); 



const PORT = 4000;


//apn.incoel.ru

app.use(helmet({
  hidePoweredBy: {
    setTo: 'PHP 4.2.0'
  }
}));

// Проксирование запросов к API strapi
app.use('/api/auth/local', createProxyMiddleware({
  target: 'http://sce.incoel.ru/api/auth/local',
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth/local': '/api/auth/local'
  },
}));

// app.use('/api', proxy('http://sce.incoel.ru/api/auth/local'));
// app.use('http://apn.incoel.ru', (req, res) => {
//   res.redirect('http://sce.incoel.ru/api/auth/local' + req.url);
// });

 
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});
