(function(ready) {
  // 监听页面加载完成
  if(document.readyState === 'complete' || document.readyState === 'interactive') {
    ready();
  } else {
    document.addEventListener('readystatechange', () => {
      if(document.readyState === 'complete') {
        ready();
      }
    });
  }
})(function ready() {
  const data = {
    FP: 0,  // 首次绘制
    FCP: 0, // 首次内容绘制
    LCP: 0, // 首次布局绘制
    FID: 0, // 首次输入延迟
  }

  // FP & FCP: 如果观察者观察到了指定类型的性能条目，就执行回调
  new PerformanceObserver((entryList, observer) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if(entry.name === 'first-paint') {
        // 首次绘制的开始时间
        data.FP = entry.startTime;
        console.log('记录首次绘制(FP)', data.FP);
      }
      if (entry.name === 'first-contentful-paint') {
        data.FCP = entry.startTime;
        console.log('记录首次内容绘制(FCP)', data.FCP);
      }
    });

    observer.disconnect();
  }).observe({ type: 'paint', buffered: true })
  // LCP
  new PerformanceObserver((entryList, observer) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if(entry.startTime > data.LCP) {
        data.LCP = entry.startTime;
        console.log('记录最大内容绘制(LCP)', data.LCP);
      }
    });
    observer.disconnect();
  }).observe({ type: 'largest-contentful-paint', buffered: true })
  // FID
  new PerformanceObserver((entryList, observer) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      // 首次用户交互，开始处理的时间 减去 开始交互的时间，就是首次交互延迟的时间
      data.FID = entry.processingStart - entry.startTime;
      console.log('记录首次交互延迟(FID)', data.FID);
    });
    observer.disconnect();
  }).observe({ type: 'first-input', buffered: true })
});