import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class AppRequest {
  instance: AxiosInstance
  constructor(baseURL: any, timeout: number) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use((config) => {
      return config
    })
    this.instance.interceptors.response.use((res) => {
      return res
    })
  }
  request<T>(config: AxiosRequestConfig<T>) {
    return this.instance.request<T>({ ...config, withCredentials: true })
  }
  get<T>(url: string, config?: AxiosRequestConfig<T>) {
    return this.request<T>({ ...config, withCredentials: true, url, method: 'get' })
  }
  post<T>(config: AxiosRequestConfig<T>) {
    return this.instance.request<T>({ ...config, method: 'post' })
  }
}
export default AppRequest
