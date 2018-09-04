import { ofType, Epic } from 'redux-observable'
import { map, switchMap, mergeMap, withLatestFrom } from 'rxjs/operators'
import { of, iif } from 'rxjs'
import { push } from 'connected-react-router'
import { TopicTypes as type, TopicActions as actions } from './actions'
import {
  fetchTopics,
  fetchTopicDetail,
  replyTopic,
  createTopic,
  topicCollect,
  topicDeCollect
} from '@/api'
import * as types from './types'
import { GlobalState } from '../rootReducer'
import { insertData, changeDetail } from '@/util'

export const createReply = (reply: Partial<types.Reply>) => ({
  ...types.replySchema,
  ...reply
})

const fetchTopics$: Epic<types.FetchTopics, any> = action$ =>
  action$.pipe(
    ofType(type.FETCH_TOPICS_REQUEST),
    switchMap(({ payload }) => fetchTopics(payload.params)),
    map(topics => actions.getTopicsResponse(topics))
  )

const fetchTopicDetial$: Epic<types.FetchTopicDetail, any, GlobalState> = (action$, state$) =>
  action$.pipe(
    ofType(type.FETCH_TOPIC_DETAIL),
    map(({ payload }) => payload.id),
    withLatestFrom(state$),
    mergeMap(
      ([id, { topics }]) => iif(
        () => topics.topicDetails.findIndex(topic => topic.id === id) > 0,
        of(actions.getTopicDetialResponse(topics.topicDetails)),
        fetchTopicDetail(id).pipe(
          map(detail => insertData(topics.topicDetails, detail)),
          map(res => actions.getTopicDetialResponse(res))
        )
      )
    )
  )

const collectTopic$: Epic<types.CollectTopic, any, GlobalState> = (action$, state$) =>
  action$.pipe(
    ofType(type.COLLECT_TOPIC),
    map(({ payload }) => payload.id),
    withLatestFrom(state$),
    mergeMap(
      ([id, { topics }]) => topicCollect(id).pipe(
        map(() => changeDetail(topics.topicDetails, id, { is_collect: true })),
        map(details => actions.getTopicDetialResponse(details))
      )
    )
  )

const deCollectTopic$: Epic<types.DeCollectTopic, any, GlobalState> = (action$, state$) =>
  action$.pipe(
    ofType(type.DE_COLLECT_TOPIC),
    map(({ payload }) => payload.id),
    withLatestFrom(state$),
    mergeMap(
      ([id, { topics }]) => topicDeCollect(id).pipe(
        map(() => changeDetail(topics.topicDetails, id, { is_collect: false })),
        map(details => actions.getTopicDetialResponse(details))
      )
    )
  )

const replyTopic$: Epic<types.ReplyTopic, any, GlobalState> = (action$, state$) =>
  action$.pipe(
    ofType(type.REPLY_TOPIC_REQUEST),
    map(({ payload }) => payload),
    withLatestFrom(state$),
    mergeMap(
      ([{ id, content, reply_id }, { user, topics }]) => replyTopic(id, content, reply_id).pipe(
        map(res => createReply({
          content,
          id: res.reply_id,
          create_at: new Date().toString(),
          author: {
            loginname: user.userInfo.loginname,
            avatar_url: user.userInfo.avatar_url
          }
        })),
        map((reply) => {
          const details = [...topics.topicDetails]
          const index = details.findIndex(item => item.id === id)
          const detail = details[index]
          detail.replies.push(reply)
          detail.reply_count += 1
          details.splice(index, 1, detail)
          return actions.getTopicDetialResponse(details)
        })
      )
    )
  )

const createTopic$: Epic<types.CreateTopic, any> = action$ =>
  action$.pipe(
    ofType(type.CREATE_TOPIC_REQUEST),
    map(({ payload }) => payload),
    switchMap(
      ({ title, tab, content }) => createTopic(title, tab, content).pipe(
        mergeMap(
          ({ topic_id }) => of(actions.getCreateTopicResponse(), push(`/detail/${topic_id}`))
        )
      )
    )
  )

export const topicEpics = [
  fetchTopics$,
  fetchTopicDetial$,
  replyTopic$,
  createTopic$,
  collectTopic$,
  deCollectTopic$
]
