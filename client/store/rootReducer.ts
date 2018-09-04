import { combineReducers } from 'redux'

import { topicRducer, TopicStore } from './topics'
import { userReducer, UserStore } from './user'

export interface GlobalState {
  topics: TopicStore,
  user: UserStore
}

export default combineReducers<GlobalState>({
  topics: topicRducer,
  user: userReducer
})
