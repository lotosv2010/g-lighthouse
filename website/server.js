const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const delayConfig = require('./utils/delayConfig');

const app = express();

app.use(logger('dev'));

app.use((req, _res, next) => {
  const url = req.url;
  const delay = delayConfig[url];
  if(delay) {
    setTimeout(next, delay)
  } else {
    next();
  }
})

app.use(compression());
app.use(express.static('public'))


app.listen(9090, () => {
  console.log(`服务器已经在9090端口上启动了...`);
});