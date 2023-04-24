import { getImageDownload } from '@/service/image-download'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fetchImageDownload = createAsyncThunk('imageDownload', async (count: number) => {
  const { data } = await getImageDownload(count)
  return data
})
const initialState = {
  images: []
}
const imageDownloadSlice = createSlice({
  name: 'imageDownload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImageDownload.fulfilled, (state, action: PayloadAction<any>) => {
      state.images = action.payload
    })
  }
})

export default imageDownloadSlice
