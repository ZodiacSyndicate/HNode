import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

import { UserStore, GlobalState } from '@/store'

const styles = createStyles({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  }
})

type NavBarProps =
  & WithStyles<typeof styles>
  & RouteComponentProps<any>
  & UserStore

class NavBar extends React.Component<NavBarProps> {
  public render() {
    const { classes, isLogin, userInfo } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton
              onClick={this.onHomeIconClick}
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
            <Typography className={classes.flex} color="inherit" variant="title">
              HNnode
            </Typography>
            {
              isLogin
                ? <Button
                    variant="raised"
                    color="primary"
                    onClick={this.createTopic}
                  >
                    新建话题
                  </Button>
                : null
            }
            {
              isLogin
                ? <Button
                  variant="flat"
                  onClick={this.handleAvatarClick}
                  >
                    <Avatar src={userInfo.avatar_url} />
                  </Button>
                : <Button
                    color="inherit"
                    variant="flat"
                    onClick={this.handleLogin}
                  >
                    登录
                  </Button>
            }
          </ToolBar>
        </AppBar>
      </div>
    )
  }

  private onHomeIconClick = () => {
    this.props.history.push('/')
  }

  private createTopic = () => {
    this.props.history.push('/topic/create')
  }

  private handleLogin = () => {
    this.props.history.push('/user/login')
  }

  private handleAvatarClick = () => {
    this.props.history.push('/user/info')
  }
}

export default connect<UserStore>(
  (state: GlobalState) => state.user,
)(withRouter(withStyles(styles)(NavBar)))
