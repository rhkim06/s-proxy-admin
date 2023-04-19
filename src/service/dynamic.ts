import appRequest from '@/request'
import { ChangeIp, Country, DynamicIp } from '@/types/ip'
import { User } from '@/types/user'

export const getDynamicIp = (id: number) => {
  return appRequest.get<DynamicIp>(`/users/dynamic-ip/${id}`)
}
export const changeIp = (countryCode: Country, proxyId: string) => {
  return appRequest.post<ChangeIp>('ip/change', {
    countryCode,
    proxyId
  })
}
