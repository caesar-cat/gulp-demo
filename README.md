# 基于gulp的前端自动化构建工程

## 项目结构

```bash
- config
  - index.js           服务端配置
  - local.js           开发环境配置
  - production         生产环境配置
- public
  - dist               生产打包目录
  - src                开发源目录
  - vendor             第三方资源目录
- views_local          开发环境模板
- views_production     生产环境模板
- gulp.js              gulp配置文件
- server.js            服务启动文件
```

## less目录

```bash
- common
  - animation.less     动画
  - layout.less        布局(header, footer, layout等)
  - reset.less         初始化
- component            组件(button, modal等)
- mixin                混合
- module               模块
- variables
  - theme.less         主题
  - variables.less     变量
- public
  - index.less         入口
```

## 图片目录

```bash
- icons                图标
- module               模块
- common               公用图片(雪碧图等)
```

## Usage

```bash
 npm install
```

### 静态开发(切图)

```bash
 gulp bs
```

### 服务端开发

```bash
 gulp watch
 npm run start
```

### 上线打包部署

```bash
 npm run build
```