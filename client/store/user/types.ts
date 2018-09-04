import { UserTypes as types } from './actions'
import { Topic } from '../topics'

export interface UserInfo {
  loginname: string
  id: string
  avatar_url: string
}

export interface UserDetailTopic {
  id: string
  author: {
    loginname: string
    avatar_url: string
  }
  title: string
  last_reply_at: string
}

export interface UserDetail {
  loginname: string
  avatar_url: string
  githubUsername: string
  create_at: string
  score: number
  recent_topics: UserDetailTopic[]
  recent_replies: UserDetailTopic[]
}

export interface UserStore {
  isLogin: boolean
  fetcingDetail: boolean
  userInfo: UserInfo
  detail: UserDetail
  collections: Topic[]
  errmsg: string
}

export interface UserLogin {
  type: types.LOGIN_REQUEST
  payload: {
    accessToken: string
  }
}

export interface FetchDetailRequest {
  type: types.FETCH_USER_DETAIL
}

export interface FetchCollectionsRequest {
  type: types.FETCH_USER_COLLECTION
}

interface GetUserResponse<K extends keyof UserStore> {
  type: types.GET_USER_RESPONSE
  payload: {
    [P in K]: UserStore[P]
  }
}

export interface LoginFailure {
  type: types.LOGIN_FAILURE
  payload: {
    errmsg: string
  }
}

export type LoginSuccess = GetUserResponse<'userInfo' | 'isLogin' | 'errmsg' >

export type GetDetailResponse = GetUserResponse<'detail' | 'fetcingDetail'>

export type GetCollectionResponse = GetUserResponse<'collections'>

export type UserAction =
  | UserLogin
  | LoginSuccess
  | LoginFailure
  | FetchCollectionsRequest
  | FetchDetailRequest
  | GetDetailResponse
  | GetCollectionResponse
