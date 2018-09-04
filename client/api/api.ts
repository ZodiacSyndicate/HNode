import * as types from '@/store'
import { handleRequest, request } from '@/api/request'

export const fetchTopics = (params: types.TopicParams) =>
  handleRequest<types.Topic[]>(request.get('/topics', { params }))

export const fetchTopicDetail = (id: string) =>
  handleRequest<types.Topic>(request.get(`/topic/${id}`, { params: { mdrender: false } }))

export const userLogin = (accessToken: string) =>
  handleRequest<types.UserInfo>(request.post('/user/login', { accessToken }))

export const fetchUserDetail = (username: string) =>
  handleRequest<types.UserDetail>(request.get(`/user/${username}`))

export const fetchUserCollections = (username: string) =>
  handleRequest<types.Topic[]>(request.get(`/topic_collect/${username}`))

export const replyTopic = (id: string, content: string, reply_id?: string) =>
  handleRequest<types.ReplyResponse>(request.post(
    `/topic/${id}/replies`,
    reply_id ? { content, reply_id } : { content }
  ))

export const createTopic = (title: string, tab: string, content: string) =>
  handleRequest<types.CreateTopicResponse>(request.post('/topics', { title, tab, content }))

export const topicCollect = (topic_id: string) =>
  handleRequest<any>(request.post('/topic_collect/collect', { topic_id }))

export const topicDeCollect = (topic_id: string) =>
  handleRequest<any>(request.post('/topic_collect/de_collect', { topic_id }))
