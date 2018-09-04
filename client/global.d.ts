declare module 'react-jss'
declare module 'react-async-bootstrapper'
declare module 'react-frontload'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare interface Window {
  __INITIAL__STATE__: any
}

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
