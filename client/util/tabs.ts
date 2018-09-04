import { parse } from 'querystring'

export const tabs = {
  all: '全部',
  share: '分享',
  job: '招聘',
  ask: '问答',
  good: '精品',
  dev: '测试'
}

export type Tabs = keyof typeof tabs

export const getTab = (search: string) => {
  const { tab } = parse(search.slice(1))
  return (tab ? tab : 'all') as Tabs
}
