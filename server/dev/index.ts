import * as webpack from 'webpack'
import * as Koa from 'koa'
import { join } from 'path'
import * as Router from 'koa-router'
import * as proxy from 'http-proxy-middleware'
import { getTemplate } from './get-template'

import serverConfig from '../webpack.config.server'
import { getModuleFromString } from './resolve-bundle'
import { render } from '../utils/render'

const MemoryFs = require('memory-fs')

// 开发时 webpack模式为开发模式
serverConfig.mode! = 'development'

const mfs = new MemoryFs

// 获取webpack的compiler实例
const compiler = webpack(serverConfig)

let serverBundle: any

// 编译出来的文件放到内存中
compiler.outputFileSystem = mfs

compiler.watch({}, (err, stats) => {
  if (err) throw err
  const stat = stats.toJson()
  stat.errors.forEach((err: any) => console.log(err))
  stat.warnings.forEach((warn: any) => console.warn(warn))
  const bundlePath = join(
    serverConfig.output!.path!,
    serverConfig.output!.filename!
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const mod = getModuleFromString(bundle, 'server-entry.js')
  // 得到client/server-entry.tsx的bundle
  serverBundle = mod.exports
})

const router = new Router()

router
  // 静态资源代理
  .get(/^\/public/, async (ctx, next) => {
    ctx.respond = false
    return proxy({
      target: 'http://localhost:8888'
    })(ctx.req, ctx.res, next)
  })
  // 渲染app并返回
  .get(/^(?!\/api)/, async (ctx) => {
    try {
      if (!serverBundle) {
        ctx.body = '编译中，刷新重试'
        return
      }
      const template = await getTemplate()

      await render(serverBundle, template, ctx)
    } catch (err) {
      console.log(err)
    }
  })

export default (app: Koa) => {
  app.use(router.routes()).use(router.allowedMethods())
}
