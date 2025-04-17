const express  = require('express');
const { writeFile }  = require('fs/promises');
const path  = require('path');
const lighthouse  = require('lighthouse');
const chromeLauncher  = require('chrome-launcher');
const dayjs  = require('dayjs');

const app = express();

const launchChromeAndRunLighthouse = async (url, opts, config = undefined) => {
  // 打开Chrome debug
  const chrome = await chromeLauncher.launch({
    chromeFlags: opts.chromeFlags
  });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    quiet: true,
    locale: 'zh',
    port: chrome.port,
    ...opts,
  }
  // 开始分析
  const results = await lighthouse(url, options, config);
  // 关闭Chrome
  await chrome.kill();
  // 生成报告
  const report = results?.report;
  console.log(report);
  await writeFile(path.join(__dirname, 'reports', `${dayjs().format('YYYY-MM-DD_HH-mm-SS')}report.html`), report);
  return report;
}

app.use(async (req, res, next) => {
  if(req.url.match('/performance')) {
    const opts = {
      chromeFlags: ['--show-paint-rects'],
      preset: 'desktop',
    }
    const report = await launchChromeAndRunLighthouse(
      'http://localhost:9090',
      opts
    )
    res.send(report);
    return
  }
  return next();
});

app.listen(9091, () => {
  console.log(`服务器已经在9091端口上启动了...`);
})
