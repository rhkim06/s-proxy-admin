import appRequest from '@/request'
import { ChangeIp, Country } from '@/types/ip'
import { User } from '@/types/user'

export const getProfile = (name: string) => {
  return appRequest.post<User>('users/profile', { name })
}
export const changeIp = (countryCode: Country) => {
  return appRequest.post<ChangeIp>('ip/change', {
    countryCode
  })
}
