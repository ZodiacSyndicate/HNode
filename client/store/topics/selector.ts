import 'core-js/modules/es.map'
import { createSelector } from 'reselect'

import { GlobalState } from '../rootReducer'
import { TopicStore, Topic } from './types'

const getTopicDetails = (state: GlobalState) => state.topics.topicDetails

export const createDetailsMap = createSelector(
  [getTopicDetails],
  (details) => {
    const detailsMap = new Map()
    details.forEach((detail) => {
      detailsMap.set(detail.id, detail)
    })
    return detailsMap
  }
)

export type MappedTopicStore = Omit<TopicStore, 'topicDetails'> & {
  topicDetails: Map<string, Topic>
}
