import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import dayjs from 'dayjs'

import Helmet from 'react-helmet'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import UserWrapper from '../user'
import { userInfoStyles } from './styles'
import { UserDetailTopic, UserStore, GlobalState, UserActions } from '@/store'

interface TopicItemProps {
  topic: UserDetailTopic
  onClick: () => void
}

const TopicItem: React.SFC<TopicItemProps> = ({ topic, onClick }) => (
  <ListItem button={true} onClick={onClick}>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      primary={topic.title}
      secondary={`最新回复：${dayjs(topic.last_reply_at).format('YYYY-MM-DD HH:mm')}`}
    />
  </ListItem>
)

type UserInfoProps =
  & WithStyles<typeof userInfoStyles>
  & UserStore
  & RouteComponentProps<any>
  & UserActions

class UserInfo extends React.Component<UserInfoProps> {
  public componentWillMount() {
    this.props.fetchDetial()
    this.props.fetchCollections()
  }

  public render() {
    const { classes, collections, detail } = this.props
    const { recent_replies, recent_topics } = detail
    return (
      <UserWrapper>
        <Helmet>
          <title>个人中心</title>
        </Helmet>
        <div className={classes.root}>
          <Grid
            container={true}
            spacing={16}
            alignItems="stretch"
          >
            <Grid
              item={true}
              xs={12}
              md={4}
            >
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {
                    recent_topics.length
                      ? recent_topics.map(topic => (
                        <TopicItem
                          topic={topic}
                          onClick={() => this.handleTopicClick(topic.id)}
                          key={topic.id}
                        />
                      ))
                      : <Typography align="center">
                          最近没有发布过话题
                        </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={4}
            >
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的回复</span>
                </Typography>
                <List>
                  {
                    recent_replies.length
                      ? recent_replies.map(topic => (
                        <TopicItem
                          topic={topic}
                          onClick={() => this.handleTopicClick(topic.id)}
                          key={topic.id}
                        />
                      ))
                      : <Typography align="center">
                          最近没有新的回复
                        </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={4}
            >
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>收藏的话题</span>
                </Typography>
                <List>
                  {
                    collections.length
                      ? collections.map(topic => (
                        <TopicItem
                          topic={topic}
                          onClick={() => this.handleTopicClick(topic.id)}
                          key={topic.id}
                        />
                      ))
                      : <Typography align="center">
                          最近没有收藏的话题
                        </Typography>
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }

  private handleTopicClick = (id: string) => {
    this.props.history.push(`/detail/${id}`)
  }
}

export default connect<UserStore, UserActions>(
  (state: GlobalState) => state.user,
  (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch)
)(withStyles(userInfoStyles)(UserInfo))
