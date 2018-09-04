import { TopicTypes as types } from './actions'
import { Tabs } from '@/util'

export interface Topic {
  id: string
  author_id: string
  tab: string
  content: string
  title: string
  last_reply_at: string
  good: boolean
  top: boolean
  reply_count: number
  visit_count: number
  create_at: string
  is_collect: boolean
  author: {
    loginname: string
    avatar_url: string
  }
  replies: Reply[]
}

export interface Reply {
  id: string
  author: {
    loginname: string
    avatar_url: string
  }
  content: string
  ups: string[]
  create_at: string
  reply_id: string | null
  is_uped: boolean
}

export interface ReplyResponse  {
  success: boolean
  reply_id: string
}

export const replySchema: Reply = {
  id: '',
  author: {
    loginname: '',
    avatar_url: ''
  },
  content: '',
  ups: [],
  create_at: '',
  reply_id: null,
  is_uped: false
}

export interface TopicParams {
  page?: number
  tab?: Tabs
  limit?: number
  mdrender?: boolean
}

export interface TopicStore {
  topics: Topic[]
  fetching: boolean
  topicDetails: Topic[]
}

export interface CreateTopicResponse {
  success: boolean
  topic_id: string
}

export interface FetchTopics {
  type: types.FETCH_TOPICS_REQUEST
  payload: {
    params: TopicParams
  }
}

export interface FetchTopicDetail {
  type: types.FETCH_TOPIC_DETAIL
  payload: {
    id: string
  }
}

export interface ReplyTopic {
  type: types.REPLY_TOPIC_REQUEST
  payload: {
    id: string
    content: string
    reply_id?: string
  }
}

export interface CreateTopic {
  type: types.CREATE_TOPIC_REQUEST
  payload: {
    title: string
    tab: string
    content: string
  }
}

export interface CollectTopic {
  type: types.COLLECT_TOPIC
  payload: {
    id: string
  }
}

export interface DeCollectTopic {
  type: types.DE_COLLECT_TOPIC
  payload: {
    id: string
  }
}

interface GetTopicStoreResponse<K extends keyof TopicStore> {
  type: types.GET_TOPICS_RESPONSE
  payload: {
    [P in K]: TopicStore[P]
  }
}

export type GetTopicDetailResponse = GetTopicStoreResponse<'topicDetails'>

export type GetTopicsResponse = GetTopicStoreResponse<'topics'>

export type GetCreateTopicResponse = GetTopicStoreResponse<'fetching'>

export type TopicsAction =
  | FetchTopics
  | GetTopicsResponse
  | FetchTopicDetail
  | GetTopicDetailResponse
  | ReplyTopic
  | CreateTopic
  | CollectTopic
  | DeCollectTopic
  | GetCreateTopicResponse
