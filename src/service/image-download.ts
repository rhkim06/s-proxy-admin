import appRequest from '@/request'
import { async } from 'q'

export const getImageDownload = async (count: number) => {
  return await appRequest.get('/image-download', {
    params: { count }
  })
}
