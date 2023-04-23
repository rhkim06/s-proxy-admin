import appRequest from '@/request'

export const getUnreadMail = async (data: any) => {
  const res = await appRequest.post('mail-server', data)
  return res
}

export const addMailServerData = async (data: any) => {
  const res = await appRequest.post('mail-server/add', data)
  return res
}

export const getAllMailServer = async (id: number) => {
  const res = await appRequest.get(`mail-server/${id}`)
  return res
}
