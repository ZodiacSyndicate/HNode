import * as pug from 'pug'
import * as ReactDOMServer from 'react-dom/server'
import * as serialize from 'serialize-javascript'
import { createMemoryHistory } from 'history'
import { Context } from 'koa'
import { createGenerateClassName, createMuiTheme } from '@material-ui/core/styles'
import { blue, pink } from '@material-ui/core/colors'
import Helmet from 'react-helmet'

const { SheetsRegistry } = require('react-jss')

export const render = async (bundle: any, template: string, ctx: Context) => {
  try {
    const history = createMemoryHistory()

    // 解析bundle得到的函数
    const createApp = bundle.default
    const { configureStore, createPreloadedState } = bundle

    //获取store和routerContext
    const preloadedState = createPreloadedState()
    const store = configureStore(preloadedState, history)
    const routerContext: {[_: string]: any} = {}

    // material-ui服务端渲染相关
    const sheetsRegistry = new SheetsRegistry()
    const sheetsManager = new Map()
    const generateClassName = createGenerateClassName()
    const theme = createMuiTheme({
      palette: {
        primary: blue,
        secondary: pink,
        type: 'light',
      },
    })

    // 得到app
    const app = createApp(
      store,
      routerContext,
      sheetsRegistry,
      generateClassName,
      theme,
      sheetsManager,
      ctx.url
    )

    // 渲染成string
    const content = ReactDOMServer.renderToString(app)

    if (ctx.session.user) {
      const { loginName, avatarUrl, id } = ctx.session.user
      preloadedState.user.isLogin = true
      preloadedState.user.userInfo.loginname = loginName
      preloadedState.user.userInfo.avatar_url = avatarUrl
      preloadedState.user.userInfo.id = id
    }

    if (routerContext.url) {
      ctx.status = 302
      ctx.set('Location', routerContext.url)
      ctx.res.end()
      return
    }

    const helmet = Helmet.rewind()

    // pug模板插入html，样式，初始state等等
    const html = pug.render(template, {
      app: content,
      muiCss: sheetsRegistry.toString(),
      initialState: serialize(preloadedState),
      meta: helmet.meta.toString(),
      title: helmet.title.toString(),
      style: helmet.style.toString(),
      link: helmet.link.toString()
    })

    ctx.body = html
  } catch (err) {
    console.log(err)
  }
}
