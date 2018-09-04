import axios from 'axios'

// 从webpack-dev-server中获取server端的pug模板
export const getTemplate = async (): Promise<string> => {
  try {
    const res = await axios.get<string>('http://localhost:8888/public/server.pug')
    return res.data
  } catch (err) {
    return err
  }
}
