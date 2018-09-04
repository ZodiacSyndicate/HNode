import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import { JssProvider } from 'react-jss'
import { MuiThemeProvider, Theme } from '@material-ui/core/styles'

import App from '@/pages/App'

export default (
  store: Store,
  routerContext: any,
  sheetsRegistry: any,
  generateClassName: any,
  theme: Theme,
  sheetsManager: Map<any, any>,
  url: string
) => (
  <Provider store={store}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { createPreloadedState, configureStore } from '@/store'
