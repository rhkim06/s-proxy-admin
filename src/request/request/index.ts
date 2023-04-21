import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { AppRequestConfig } from '../types'

class AppRequest {
  instance: AxiosInstance
  constructor(config: AppRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config: AppRequestConfig) => {
        console.log('global request success interceptor')
        return config
      },
      (err: any) => {
        console.log('global request failure interceptor')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.headers.getAuthorization) {
          const token = res.headers.getAuthorization
          window.localStorage.setItem('token', token.toString())
        }
        console.log('global response success interceptor')
        return res
      },
      (err: any) => {
        console.log('global response failure interceptor')
        return err
      }
    )
    this.instance.interceptors.request.use(
      config.interceptors?.onRequestFulfilled,
      config.interceptors?.onRequestRejected
    )
    this.instance.interceptors.response.use(
      config.interceptors?.onResponseFulfilled,
      config.interceptors?.onResponseRejected
    )
  }
  request<T = any>(config: any) {
    if (config.interceptors?.onRequestFulfilled) {
      config = config.interceptors.onRequestFulfilled(config)
    }
    if (config.interceptors?.onRequestRejected) {
      config = config.interceptors.onRequestRejected(config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.onResponseFulfilled) {
            res = config.interceptors.onResponseFulfilled(res)
          }
          resolve(res)
        })
        .catch((err) => {
          if (config.interceptors?.onRequestRejected) {
            err = config.interceptors.onRequestRejected(err)
          }
          reject(err)
        })
    })
  }
  post<T = any>(config: AppRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  get<T = any>(config: AppRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }
}

export default AppRequest
