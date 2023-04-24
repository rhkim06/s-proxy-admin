import appRequest from '@/request'

export const getName = async () => {
  return await appRequest.get('/create-profile/name')
}
