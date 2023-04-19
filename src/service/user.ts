import appRequest from '@/request'

export const getUserProfile = (id: number) => {
  return appRequest.get(`/users/${id}`)
}
