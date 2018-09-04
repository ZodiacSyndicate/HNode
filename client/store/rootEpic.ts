import { combineEpics } from 'redux-observable'

import { topicEpics } from './topics'
import { userEpics } from './user'

export default combineEpics(
  ...topicEpics,
  ...userEpics
)
