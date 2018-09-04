import { UserTypes as types } from './actions'
import { UserStore, UserAction } from './types'

export const userInitialState: UserStore = {
  isLogin: false,
  fetcingDetail: false,
  userInfo: {
    loginname: '',
    avatar_url: '',
    id: '',
  },
  detail: {
    loginname: '',
    avatar_url: '',
    create_at: '',
    score: 0,
    githubUsername: '',
    recent_topics: [],
    recent_replies: []
  },
  collections: [],
  errmsg: ''
}

export const userReducer = (state: UserStore = userInitialState, action: UserAction): UserStore => {
  switch (action.type) {
    case types.LOGIN_REQUEST: return state
    case types.LOGIN_FAILURE: return { ...state, ...action.payload }
    case types.FETCH_USER_DETAIL: return { ...state, fetcingDetail: true }
    case types.FETCH_USER_COLLECTION: return state
    case types.GET_USER_RESPONSE: return { ...state, ...action.payload }
    default: return state
  }
}
