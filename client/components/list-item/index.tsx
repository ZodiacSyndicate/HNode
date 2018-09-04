import * as React from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'
import { withStyles, WithStyles } from '@material-ui/core'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

import { Topic } from '@/store'
import { topicPrimaryStyles, topicSecondaryStyles } from '@/components/list-item/styles'
import { tabs } from '@/util'

interface BaseProps {
  topic: Topic
}

interface TopicItemProps extends BaseProps {
  onClick: (event: React.MouseEvent) => void
}

type PrimaryProps = BaseProps & WithStyles<typeof topicPrimaryStyles>

type SecondaryProps = BaseProps & WithStyles<typeof topicSecondaryStyles>

const Primary: React.SFC<PrimaryProps> = ({ topic, classes }) => {
  const classNames = cx(
    classes.tab,
    { [classes.top]: topic.top },
  )

  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const StyledPrimary = withStyles(topicPrimaryStyles)(Primary)

const Secondary: React.SFC<SecondaryProps> = ({ topic, classes }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间：{dayjs(topic.create_at).format('YYYY-MM-DD HH:mm')}</span>
  </span>
)

const StyledSecondary = withStyles(topicSecondaryStyles)(Secondary)

const TopicItem: React.SFC<TopicItemProps> = ({ onClick, topic }) => (
  <>
    <Divider />
    <ListItem onClick={onClick} button={true}>
      <ListItemAvatar>
        <Avatar src={topic.author.avatar_url} />
      </ListItemAvatar>
      <ListItemText
        primary={<StyledPrimary topic={topic} />}
        secondary={<StyledSecondary topic={topic} />}
      />
    </ListItem>
  </>
)

export default TopicItem
