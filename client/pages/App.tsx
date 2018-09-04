import * as React from 'react'
import { hot } from 'react-hot-loader'

import Routes from '@/router'
import NavBar from '@/components/navbar'

class App extends React.Component {
  public render() {
    return [
      <NavBar key="nave" />,
      <Routes key="routes" />
    ]
  }
}

export default hot(module)(App)
