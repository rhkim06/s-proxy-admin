import appRequest from '@/request'
import { RemoveRes } from '@/types/ip'
import { BuyStatic } from '@/types/rola'
import { Token } from '@/types/user'

export const buyStaticIp = (config: any) => {
  return appRequest.post<BuyStatic>('/static-ips/buy', { ...config })
}

export const getAllStaticIpList = () => {
  return appRequest.get<any>('/static-ips')
}

export const removeStaticIpById = (id: string) => {
  return appRequest.delete<RemoveRes>(`/static-ips/${id}`)
}

export const getStaticIps = (payload: any) => {
  const { id, page = 0 } = payload
  return appRequest.get<any>(`/static-ips/${id}?offset=${page}`)
}
