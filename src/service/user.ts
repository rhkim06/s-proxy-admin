import appRequest from '@/request'

export const getUser = (id: number) => {
  return appRequest.get(`/users/${id}`)
}
