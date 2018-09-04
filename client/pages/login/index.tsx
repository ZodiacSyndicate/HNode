import * as React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as qs from 'querystring'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import TextFeied from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Helmet from 'react-helmet'

import UserWrapper from '../user'
import { loginStyles } from './styles'
import { UserStore, UserActions, GlobalState } from '@/store'

type LoginProps =
  & WithStyles<typeof loginStyles>
  & UserStore
  & UserActions
  & RouteComponentProps<any>

interface LoginState {
  accesstoken: string
  helpText: string
}

class Login extends React.Component<LoginProps, LoginState> {
  public state: LoginState = {
    accesstoken: '',
    helpText: ''
  }

  public componentWillMount() {
    const { isLogin, history } = this.props
    if (isLogin) {
      history.replace('/user/info')
    }
  }

  public render() {
    const { classes, isLogin, errmsg } = this.props
    const { helpText, accesstoken } = this.state
    const hasError = !!errmsg
    const from = this.getFrom()
    if (isLogin) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <UserWrapper>
        <Helmet>
          <title>登录</title>
        </Helmet>
        <div className={classes.root}>
          <TextFeied
            error={hasError}
            label={hasError ? errmsg : '请输入Cnode AccessToken'}
            required={true}
            onChange={this.handleInputChange}
            className={classes.input}
            value={accesstoken}
            helperText={helpText}
          />
          <Button
            variant="raised"
            color="primary"
            className={classes.loginButton}
            onClick={this.handleLogin}
          >
            登 录
          </Button>
        </div>
      </UserWrapper>
    )
  }

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      accesstoken: e.target.value.trim()
    })
  }

  private getFrom = (location?: RouteComponentProps<any>['location']) => {
    const loc = location || this.props.location
    const query = qs.parse(loc.search.slice(1))
    return query.from as string || '/user/info'
  }

  private handleLogin = () => {
    const { accesstoken } = this.state
    if (!accesstoken) {
      this.setState({
        helpText: '请填写accessToken'
      })
    }
    this.setState({
      helpText: ''
    })
    this.props.userLogin(accesstoken)
  }
}

const mapStateToProps = (state: GlobalState): UserStore => state.user
const mapActionsToProps = (dispatch: Dispatch): UserActions =>
  bindActionCreators(UserActions, dispatch)

export default connect<UserStore, UserActions>(
  mapStateToProps,
  mapActionsToProps
)(withStyles(loginStyles)(Login))
