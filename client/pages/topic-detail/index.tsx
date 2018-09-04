import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import dayjs from 'dayjs'
import Helmet from 'react-helmet'

import { withStyles, WithStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'

import Container from '@/components/container'
import { GlobalState, MappedTopicStore, TopicActions, UserStore, createDetailsMap } from '@/store'
import { topicDetailStyle } from './styles'
import Markdown from '@/components/markdown'
import SimpleMDE from '@/components/simple-mde'
import Reply from '@/components/reply'

interface TopicDetailActions extends TopicActions {
  push: typeof push
}

type TopicDetialStore = MappedTopicStore & UserStore

type TopicDetialProps =
  & TopicDetailActions
  & TopicDetialStore
  & WithStyles<typeof topicDetailStyle>
  & RouteComponentProps<any>

interface TopicDetialState {
  reply: string
}

class TopicDetial extends React.Component<TopicDetialProps, TopicDetialState> {
  public readonly state: TopicDetialState = {
    reply: ''
  }

  public componentWillMount() {
    const id = this.getTopicDetailId()
    this.props.fetchTopicDetail(id)
  }

  public render() {
    const { classes, isLogin } = this.props
    const id = this.getTopicDetailId()
    const topic = this.props.topicDetails.get(id)

    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="primary" />
          </section>
        </Container>
      )
    }

    return (
      <>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
            {
              isLogin
                ? <Button
                    className={classes.collectButton}
                    color="primary" variant="raised"
                    onClick={this.handleCollectButtonClick}
                  >
                    {topic.is_collect ? '取消收藏' : '收藏'}
                  </Button>
                : null
            }
          </header>
          <section className={classes.body}>
            <Markdown source={topic.content} />
          </section>
        </Container>
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{topic.reply_count}回复</span>
            <span>最新回复{dayjs(topic.last_reply_at).format('YYYY-MM-DD')}</span>
          </header>
          {
            isLogin ? (
              <section className={classes.replyEditor}>
                <SimpleMDE
                  onChange={this.handleEditorChange}
                  options={{
                    autoFocus: false,
                    spellChecker: false,
                    placeholder: '添加回复'
                  }}
                />
                <Button
                  variant="fab"
                  color="primary"
                  className={classes.replyButton}
                >
                  <IconReply />
                </Button>
              </section>
            ) : (
              <section className={classes.notLoginButton}>
                <Button variant="raised" color="primary">登录并回复</Button>
              </section>
            )
          }
          <section>
            {
              topic.replies.map(
                reply => <Reply reply={reply} key={reply.id} />
              )
            }
          </section>
        </Paper>
      </>
    )
  }

  private handleCollectButtonClick = () => {
    const { collectTopic, deCollectTopic, topicDetails } = this.props
    const id = this.getTopicDetailId()
    const topic = topicDetails.get(id)
    if (topic!.is_collect) {
      deCollectTopic(id)
    } else {
      collectTopic(id)
    }
  }

  private handleEditorChange = (value: string) => {
    this.setState({
      reply: value
    })
  }

  private getTopicDetailId = () => this.props.match.params.id
}

export default withStyles(topicDetailStyle)(
  connect<TopicDetialStore, TopicDetailActions>(
    (state: GlobalState) => ({
      ...state.topics,
      ...state.user,
      topicDetails: createDetailsMap(state)
    }),
    (dispatch: Dispatch) => bindActionCreators(
      {
        ...TopicActions,
        push
      },
      dispatch,
    )
  )(TopicDetial)
)
