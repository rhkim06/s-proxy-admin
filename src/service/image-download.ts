import appRequest from '@/request'

export const getImageDownload = async (count: number) => {
  return await appRequest.get('/image-download', {
    params: { count }
  })
}
