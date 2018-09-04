import * as Koa from 'koa'
import * as mount from 'koa-mount'
import * as favicon from 'koa-favicon'
import * as session from 'koa-session'
import * as body from 'koa-body'
import * as fs from 'fs'
import * as path from 'path'

import { render, assetsApp, apiRouter, externalStore } from './utils'

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa()

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.keys = ['hehe', 'asdaseref']

app.use(session({
  maxAge: 120 * 60 * 1000,
  key: 'react-cnode',
  store: externalStore,
  renew: false
}, app))

app.use(body())

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

if (!isDev) {
  // 生产环境下，从打包好的文件中获取服务端bundle和pug模板
  const serverEntry = require('../dist/server-entry')
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.pug'), 'utf8')
  // 静态资源
  app.use(mount('/public', assetsApp))
  app.use(async ctx => {
    try {
      await render(serverEntry, template, ctx)
    } catch (err) {
      console.log(err)
    }
  })
} else {
  const handleDev = require('./dev').default
  handleDev(app)
}

app.on('error', (err, ctx) => {
  console.error(err)
  ctx.status = 500
  ctx.body = err
})

app.listen(3333, () => {
  console.log('server listen 3333')
})
