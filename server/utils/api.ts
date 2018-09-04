import * as Router from 'koa-router'
import { Context } from 'koa'
import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import 'koa-body'

import { baseURL } from '../config'

const router = new Router()

export const request = axios.create({
  baseURL,
})

const apiController = async (ctx: Context) => {
  try {
    const path = ctx.path.slice(4)
    const { user = {} } = ctx.session

    let res: AxiosResponse

    if (ctx.method === 'GET') {
      res = await request.get(path, {
        params: {
          ...ctx.query,
          accesstoken: user.accessToken
        }
      })
    }
    if (ctx.method === 'POST') {
      res = await request.post(
        path,
        stringify({
          ...ctx.request.body,
          accesstoken: user.accessToken
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
    }

    if (res.status === 200) {
      ctx.body = res.data
    } else {
      ctx.status = res.status
      ctx.body = res.data
    }
  } catch (err) {
    if (err.response) {
      ctx.status = 500
      ctx.body = err.response.data
    } else {
      ctx.status = 500
      ctx.body = {
        success: false,
        msg: '未知错误'
      }
    }
  }
}

const authController = async (ctx: Context) => {
  try {
    const { accessToken } = ctx.request.body
    const res = await request.post('/accesstoken', {accesstoken: accessToken})
    const { loginname, id, avatar_url } = res.data
    if (res.status === 200 && res.data.success) {
      ctx.session.user = {
        accessToken,
        id,
        loginName: loginname,
        avatarUrl: avatar_url
      }
      ctx.body = {
        success: true,
        data: res.data
      }
    }
  } catch (err) {
    if (err.response) {
      ctx.status = err.response.status
      ctx.body = {
        success: false,
        errorMsg: err.response.data.error_msg
      }
    } else {
      ctx.status = 500
      ctx.body = {
        success: false,
        msg: '未知错误'
      }
    }
  }
}

router
  .post('/api/user/login', authController)
  .post(/^\/api/, apiController)
  .get(/^\/api/, apiController)

export default router
