import * as types from '@/store/topics/types'

export enum TopicTypes {
  FETCH_TOPICS_REQUEST = 'FETCH_TOPICS_REQUEST',
  FETCH_TOPIC_DETAIL = 'FETCH_TOPIC_DETAIL',
  REPLY_TOPIC_REQUEST = 'REPLY_TOPIC_REQUEST',
  CREATE_TOPIC_REQUEST = 'CREATE_TOPIC_REQUEST',
  COLLECT_TOPIC = 'COLLECT_TOPIC',
  DE_COLLECT_TOPIC = 'DE_COLLECT_TOPIC',
  GET_TOPICS_RESPONSE = 'GET_TOPICS_RESPONSE',
}

export const TopicActions = {
  fetchTopics: (params: types.TopicParams): types.FetchTopics => ({
    type: TopicTypes.FETCH_TOPICS_REQUEST,
    payload: { params }
  }),

  getTopicsResponse: (topics: types.Topic[]): types.GetTopicsResponse => ({
    type: TopicTypes.GET_TOPICS_RESPONSE,
    payload: { topics }
  }),

  fetchTopicDetail: (id: string): types.FetchTopicDetail => ({
    type: TopicTypes.FETCH_TOPIC_DETAIL,
    payload: { id }
  }),

  getTopicDetialResponse: (topicDetails: types.Topic[]): types.GetTopicDetailResponse => ({
    type: TopicTypes.GET_TOPICS_RESPONSE,
    payload: { topicDetails }
  }),

  replyTopic: (id: string, content: string, reply_id?: string): types.ReplyTopic => ({
    type: TopicTypes.REPLY_TOPIC_REQUEST,
    payload: reply_id ? { id, content, reply_id } : { id, content }
  }),

  collectTopic: (id: string): types.CollectTopic => ({
    type: TopicTypes.COLLECT_TOPIC,
    payload: {
      id
    }
  }),

  deCollectTopic: (id: string): types.DeCollectTopic => ({
    type: TopicTypes.DE_COLLECT_TOPIC,
    payload: {
      id
    }
  }),

  createTopic: (title: string, tab:string, content: string): types.CreateTopic => ({
    type: TopicTypes.CREATE_TOPIC_REQUEST,
    payload: {
      title,
      tab,
      content
    }
  }),

  getCreateTopicResponse: (): types.GetCreateTopicResponse => ({
    type: TopicTypes.GET_TOPICS_RESPONSE,
    payload: {
      fetching: false
    }
  })
}

export type TopicActions = typeof TopicActions
