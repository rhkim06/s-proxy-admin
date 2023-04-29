import { getImageDownload, getImageList } from '@/service/image-server'
import { ImageList, ImageListDataRes, ImageListPayload, ImageListRecord } from '@/types/image-server'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fetchImageDownload = createAsyncThunk('imageDownload', async (count: number) => {
  const { data } = await getImageDownload(count)
  return data
})
export const fetchImageList = createAsyncThunk('imageList', async (payload: ImageListPayload) => {
  const { data } = await getImageList(payload)
  return data
})
type InitialState = {
  imagesForDown: any[]
  imageList: ImageList
}
const initialState: InitialState = {
  imagesForDown: [],
  imageList: {
    records: [],
    total: 0,
    current: 0,
    size: 0
  }
}
const imageServerSlice = createSlice({
  name: 'imageServer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImageDownload.fulfilled, (state, action: PayloadAction<any>) => {
      state.imagesForDown = action.payload
    })
    builder.addCase(fetchImageList.fulfilled, (state, action: PayloadAction<ImageListDataRes>) => {
      state.imageList.records = action.payload.records
      state.imageList.total = action.payload.total
      state.imageList.current = action.payload.current
      state.imageList.size = action.payload.size
    })
  }
})

export default imageServerSlice
