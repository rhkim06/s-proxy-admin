import appRequest from '@/request'
import { StatusCode } from '@/types/login-status'
import { TokenVerified } from '@/types/user'

export const login = (data: any) => {
  return appRequest.post<StatusCode>('auth/login', data)
}
export const getAuth = () => {
  return appRequest.get<TokenVerified>('auth/check-token')
}
