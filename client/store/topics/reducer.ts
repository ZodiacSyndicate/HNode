import { TopicStore, TopicsAction } from '@/store/topics/types'
import { TopicTypes as types } from '@/store/topics/actions'

export const topicInitialState: TopicStore = {
  topics: [],
  fetching: false,
  topicDetails: []
}

export const topicRducer = (
  state: TopicStore = topicInitialState,
  action: TopicsAction
): TopicStore => {
  switch (action.type) {
    case types.FETCH_TOPICS_REQUEST: return { ...state, fetching: true }
    case types.GET_TOPICS_RESPONSE: return { ...state, fetching: false, ...action.payload }
    case types.FETCH_TOPIC_DETAIL: return { ...state, fetching: true }
    case types.COLLECT_TOPIC: return state
    case types.DE_COLLECT_TOPIC: return state
    case types.REPLY_TOPIC_REQUEST: return state
    default: return state
  }
}
