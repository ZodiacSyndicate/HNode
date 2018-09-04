import * as React from 'react'
import dayjs from 'dayjs'

import Avatar from '@material-ui/core/Avatar'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import { Reply as Re } from '@/store'
import { replyStyle } from '@/components/reply/styles'
import Markdown from '@/components/markdown'

interface Props {
  reply: Re
}

type ReplyProps = Props & WithStyles<typeof replyStyle>

const Reply: React.SFC<ReplyProps> = ({ reply, classes }) => (
  <div className={classes.root}>
    <div className={classes.left}>
      <Avatar src={reply.author.avatar_url} />
    </div>
    <div className={classes.right}>
      <span>{reply.author.loginname + ' ' + dayjs(reply.create_at).format('YY-MM-DD')}</span>
      <Markdown source={reply.content} />
    </div>
  </div>
)

export default withStyles(replyStyle)(Reply)
