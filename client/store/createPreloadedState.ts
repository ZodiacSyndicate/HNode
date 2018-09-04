import { GlobalState } from './rootReducer'
import { topicInitialState } from './topics'
import { userInitialState } from './user'

export const createPreloadedState = (): GlobalState => ({
  topics: topicInitialState,
  user: userInitialState
})
