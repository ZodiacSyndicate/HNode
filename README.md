# HNode

*利用CNode Api开发的同构项目*

- 100% typescript
- 开发时服务端渲染
- React全家桶，Redux-observable中间件
- Jss with Material-UI
- session with Redis
- seo with react-helmet

## 功能

- 话题列表
- 话题详情，回复
- 新建话题，收藏话题

## 安装

*运行此项目需要安装redis*

`git clone https://github.com/ZodiacSyndicate/HNode.git`

  ### 安装依赖

  `yarn` or `npm install`

  ### 开发

  *因为是客户端与服务端同步开发，所以需要启动两个命令行*

  `npm run dev:client` & `npm run dev:server`

  client: `locolhost:8888`
  server: `localhost:3333`

  ### 构建

  `npm run build` & `npm start`

## TODO

- build后服务端渲染样式丢失的问题

#### 欢迎star！
