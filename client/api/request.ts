import axios, { AxiosPromise } from 'axios'
import { Observable } from 'rxjs/observable'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { map } from 'rxjs/operators'

const baseURL = process.env.API_BASE || '/api'

export const request = axios.create({ baseURL })

export const handleRequest = <T = any>(req: AxiosPromise): Observable<T> =>
  fromPromise(req).pipe(
    map(({ data, status }) => {
      if (data.success && status === 200) {
        return data.data ? data.data : data
      }
    })
  )
