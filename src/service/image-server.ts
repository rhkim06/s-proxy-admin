import appRequest from '@/request'
import { ImageList, ImageListDataRes, ImageListPayload, ImageListRecord } from '@/types/image-server'

export const getImageDownload = async (count: number) => {
  return await appRequest.get('/image-server/download', {
    params: { count }
  })
}

export const getImageList = async (payload: ImageListPayload) => {
  return await appRequest.post<ImageListDataRes>('/image-server/list', payload)
}

export const deleteImageList = async (payload: Pick<ImageListRecord, 'id' | 'imageUrl'>) => {
  return await appRequest.post<any>('/image-server/delete', payload)
}
