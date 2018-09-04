import * as React from 'react'
import { connect } from 'react-redux'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import UserIcon from '@material-ui/icons/AccountCircle'

import { UserStore, GlobalState } from '@/store'
import Container from '@/components/container'
import { userStyles } from './styles'

type UserProps = WithStyles<typeof userStyles> & UserStore

class User extends React.Component<UserProps> {
  public render() {
    const { classes, children, userInfo } = this.props
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg}/>
          {
            userInfo.avatar_url
              ? <Avatar className={classes.avatarImg} src={userInfo.avatar_url} />
              : <Avatar className={classes.avatarImg}>
                  <UserIcon />
                </Avatar>
          }
          <span className={classes.userName}>{userInfo.loginname || '未登录'}</span>
        </div>
        {children}
      </Container>
    )
  }
}

export default connect<UserStore>(
  (state: GlobalState) => state.user
)(
  withStyles(userStyles)(User)
)
