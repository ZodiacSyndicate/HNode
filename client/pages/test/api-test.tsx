import * as React from 'react'
import axios from 'axios'

export default class Test extends React.Component {
  public render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markall</button>
      </div>
    )
  }

  private login = async () => {
    const res = await axios.post('/api/user/login', {
      accessToken: 'dbcf07a1-5a31-4424-8ff1-7ae1ffb1635a'
    })
    console.log(res.data)
  }

  private getTopics = async () => {
    const topics = await axios.get('/api/topics')
    console.log(topics.data)
  }

  private markAll = async () => {
    const res = await axios.post('/api/message/mark_all?needAccessToken=true')
    console.log(res.data)
  }
}
