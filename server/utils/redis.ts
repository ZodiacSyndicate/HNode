import * as Redis from 'ioredis'

import { redisPwd } from '../config'

const redis = new Redis({
  password: redisPwd
})

export const externalStore = {
  get: async (key: string, maxAge: number) => {
    const value = await redis.get(key)
    return JSON.parse(value)
  },

  set: async (key: string, value: any, maxAge: number) => {
    await redis.set(key, JSON.stringify(value), 'px', maxAge)
  },

  destroy: async (key: string) => {
    redis.del(key)
  }
}
