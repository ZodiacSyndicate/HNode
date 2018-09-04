import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue, pink } from '@material-ui/core/colors'

import App from '@/pages/App'

import { configureStore } from '@/store'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    type: 'light'
  }
})

const history = createBrowserHistory()

const initialState = window.__INITIAL__STATE__ || {}

const store = configureStore(initialState, history)

const root = document.getElementById('root') as HTMLDivElement

const createApp = (TheApp: React.ComponentClass<any, any>) => class extends React.Component {
  public componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  public render() {
    return <TheApp />
  }
}

const render = (Component: React.ComponentType<any>) => (
  ReactDOM.hydrate(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Component />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  root
  )
)

render(createApp(App))
