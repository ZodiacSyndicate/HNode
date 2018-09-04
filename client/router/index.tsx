import * as React from 'react'
import { Route, Switch, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import TopicList from '@/pages/topic-list'
import TopiDetail from '@/pages/topic-detail'
import Test from '@/pages/test/api-test'
import Login from '@/pages/login'
import UserInfo from '@/pages/info'
import TopicCreate from '@/pages/topic-create'

import { UserStore, GlobalState } from '@/store'

type PrivateRouteProps =
  & Pick<UserStore, 'isLogin'>
  & RouteProps

const PRoute: React.SFC<PrivateRouteProps> = ({ component: Component, isLogin, ...rest }) => {
  const Comp = Component as React.StatelessComponent<RouteComponentProps<any>>
  return <Route {...rest} render={
    props => isLogin
      ? <Comp {...props} />
      : <Redirect
          to={{
            pathname: '/user/login',
            search: `from=${rest.path}`
          }}
        />
  }/>
}

const PrivateRoute = connect<Pick<UserStore, 'isLogin'>>(
  (state: GlobalState) => ({
    isLogin: state.user.isLogin
  })
)(PRoute)

export default (): JSX.Element => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/list" />} exact={true} />
    <Route path="/list" component={TopicList} />
    <Route path="/detail/:id" component={TopiDetail} />
    <Route path="/test" component={Test} />
    <Route path="/user/login" component={Login} />
    <PrivateRoute path="/user/info" component={UserInfo} />
    <PrivateRoute path="/topic/create" component={TopicCreate} />
  </Switch>
)
