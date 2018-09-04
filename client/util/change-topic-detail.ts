import { Topic } from '@/store'

export const changeDetail = (source: Topic[], id: string, change: Partial<Topic>) => {
  const details = [...source]
  const index = details.findIndex(item => item.id === id)
  const detail = details[index]
  details.splice(index, 1, {
    ...detail,
    ...change
  })
  return details
}
