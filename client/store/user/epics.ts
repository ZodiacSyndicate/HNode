import { ofType, Epic } from 'redux-observable'
import { map, mergeMap, withLatestFrom, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { UserActions as actions, UserTypes } from './actions'
import * as types from './types'
import { GlobalState } from '../rootReducer'
import { userLogin, fetchUserDetail, fetchUserCollections } from '@/api'

const login: Epic<types.UserLogin, any> = action$ =>
  action$.pipe(
    ofType(UserTypes.LOGIN_REQUEST),
    map(({ payload }) => payload.accessToken),
    mergeMap(
      token => userLogin(token).pipe(
        map(res => actions.loginSuccess(res)),
        catchError(err => of(actions.loginFailure(err.response.data.errorMsg)))
      )
    )
  )

const fetchDetial: Epic<types.FetchDetailRequest, any, GlobalState> = (action$, state$) =>
  action$.pipe(
    ofType(UserTypes.FETCH_USER_DETAIL),
    withLatestFrom(state$),
    mergeMap(
      ([, { user }]) => fetchUserDetail(user.userInfo.loginname).pipe(
        map(res => actions.getDetailResponse(res))
      )
    )
  )

const fetchCollections: Epic<types.FetchCollectionsRequest, any, GlobalState> = (action$, state$) =>
  action$.pipe(
    ofType(UserTypes.FETCH_USER_COLLECTION),
    withLatestFrom(state$),
    mergeMap(
      ([, { user }]) => fetchUserCollections(user.userInfo.loginname).pipe(
        map(res => actions.getCollectionResponse(res))
      )
    )
  )

export const userEpics = [
  login,
  fetchDetial,
  fetchCollections
]
