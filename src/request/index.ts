import AppRequest from './request'
import { BASE_URL, TIMEOUT } from './config'
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios'

const request9002 = axios.create({
  headers: new AxiosHeaders().set('authorization'),
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
request9002.interceptors.response.use(
  (res) => {
    const token = res.headers.authorization
    if (token) {
      localStorage.setItem('access_token', token)
    }
    return res
  },
  (err) => {}
)
// const request8000 = new AppRequest({
//   baseURL: BASE_URL1,
//   timeout: TIMEOUT,
//   interceptors: {
//     onRequestFulfilled: (config) => {
//       return config
//     }
//   }
// })

// const rolaRequest = axios.create({
//   headers: new AxiosHeaders().set('Content-Type', 'application/json'),
//   baseURL: ROLA_URL,
//   timeout: TIMEOUT
//   // interceptors: {
//   //   onRequestFulfilled: (config) => {
//   //     console.log('BASE_URL request success interceptor')
//   //     return config
//   //   }
//   // }
// })
export default request9002
