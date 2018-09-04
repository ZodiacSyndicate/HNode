import { Topic } from '@/store'

export const topicSchema: Topic = {
  id: '',
  author_id: '',
  tab: '',
  content: '',
  title: '',
  last_reply_at: '',
  good: false,
  top: false,
  reply_count: 0,
  visit_count: 0,
  create_at: '',
  is_collect: false,
  author: {
    loginname: '',
    avatar_url: ''
  },
  replies: []
}
