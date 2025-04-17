# g-lighthouse

使用 lighthouse 分析网页性能

## lighthouse 使用

### 在 Node 命令行工具中使用

- 安装Lighthouse

```shell
npm i lighthouse -g
```

- 添加命令

```json
"lighthouse": "lighthouse http://localhost:9090 --locale zh --quiet --chrome-flags='--headless' --only-categories=performance"
```

- 使用Lighthouse

```shell
npm run lighthouse
```

### 使用 Node module

#### 网站

- 安装依赖

```shell
npm i -S express morgan compression
```

- 服务器

详细代码: `website/server.js`

- 网页

详细代码: `website/public/index.html`

- 脚本

详细代码: `website/public/perf.js`

#### Lighthouse

- 安装依赖

```shell
npm i -S koa chrome-launcher lighthouse dayjs
```

- 添加命令

```json
"dev": "nodemon ./performance/index.js"
```

- 使用Lighthouse

```shell
# 1.运行下列命令
npm run dev
# 2.访问一下地址
http://localhost:9091/performance
```

- 服务器

详细代码: `performance/index.js`
