import appRequest from '@/request'

export const ipCheck = async (ip?: string) => {
  let params = {}
  if (ip !== '') {
    params = {
      params: { ip }
    }
  }
  return await appRequest.get('ip-check', params)
}
