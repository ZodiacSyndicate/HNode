import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { History } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from './rootReducer'
import rootEpic from './rootEpic'

export const configureStore = (prelodedState: any = {}, history: History) => {
  const epicMiddleware = createEpicMiddleware()
  const epic$ = new BehaviorSubject(rootEpic)
  let middleware = applyMiddleware(epicMiddleware, routerMiddleware(history))
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware)
  }
  const store = createStore(connectRouter(history)(rootReducer), prelodedState, middleware)
  const hotReloadEpic = (...args: any[]) =>
    epic$.pipe(
      switchMap(epic => epic(...args))
    )
  epicMiddleware.run(hotReloadEpic as any)
  const hot = !!(module as any).hot
  if (hot) {
    (module as any).hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default
      store.replaceReducer(nextReducer)
    })
  }
  if (hot) {
    (module as any).hot.accept('./rootEpic', () => {
      const nextEpic = require('./rootEpic').default
      epic$.next(nextEpic)
    })
  }
  return store
}
