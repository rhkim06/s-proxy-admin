import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

interface IInterceptors<T = any> {
  onRequestFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  onRequestRejected?: (err: any) => any
  onResponseFulfilled?: (res: T) => T
  onResponseRejected?: (err: any) => any
}

interface AppRequestConfig<T = any> extends InternalAxiosRequestConfig {
  interceptors?: IInterceptors<T>
}

export type { AppRequestConfig }
