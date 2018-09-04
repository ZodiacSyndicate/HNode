import * as types from './types'
import { Topic } from '../topics'

export enum UserTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  FETCH_USER_DETAIL = 'FETCH_USER_DETAIL',
  FETCH_USER_COLLECTION = 'FETCH_USER_COLLECTION',
  GET_USER_RESPONSE = 'GET_USER_RESPONSE'
}

export const UserActions = {
  userLogin: (accessToken: string): types.UserLogin => ({
    type: UserTypes.LOGIN_REQUEST,
    payload: {
      accessToken
    }
  }),

  loginSuccess: (userInfo: types.UserInfo): types.LoginSuccess => ({
    type: UserTypes.GET_USER_RESPONSE,
    payload: {
      userInfo,
      isLogin: true,
      errmsg: ''
    }
  }),

  loginFailure: (errmsg: string): types.LoginFailure => ({
    type: UserTypes.LOGIN_FAILURE,
    payload: {
      errmsg
    }
  }),

  fetchDetial: (): types.FetchDetailRequest => ({
    type: UserTypes.FETCH_USER_DETAIL,
  }),

  getDetailResponse: (detail: types.UserDetail): types.GetDetailResponse => ({
    type: UserTypes.GET_USER_RESPONSE,
    payload: {
      detail,
      fetcingDetail: false
    }
  }),

  fetchCollections: (): types.FetchCollectionsRequest => ({
    type: UserTypes.FETCH_USER_COLLECTION,
  }),

  getCollectionResponse: (collections: Topic[]): types.GetCollectionResponse => ({
    type: UserTypes.GET_USER_RESPONSE,
    payload: {
      collections
    }
  })
}

export type UserActions = typeof UserActions
