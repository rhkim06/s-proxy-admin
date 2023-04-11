import AppRequest from './request'
import { BASE_URL } from './request/config'

const appRequest = new AppRequest(BASE_URL, 5000)

export default appRequest
