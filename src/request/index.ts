import AppRequest from './request'
import { BASE_URL, TIMEOUT } from './config'
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios'

const request9002 = axios.create({
  headers: new AxiosHeaders().set('Content-Type', 'application/json'),
  baseURL: BASE_URL,
  timeout: TIMEOUT
  // interceptors: {
  //   onRequestFulfilled: (config) => {
  //     console.log('BASE_URL request success interceptor')
  //     return config
  //   }
  // }
})
request9002.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.set('authorization', token)
  }
  return config
})
// const request8000 = new AppRequest({
//   baseURL: BASE_URL1,
//   timeout: TIMEOUT,
//   interceptors: {
//     onRequestFulfilled: (config) => {
//       return config
//     }
//   }
// })
export default request9002
