import * as Koa from 'koa'
import * as serve from 'koa-static'
import { join } from 'path'

// 静态资源
const app = new Koa()

app.use(serve(join(__dirname, '../../dist')))

export default app
