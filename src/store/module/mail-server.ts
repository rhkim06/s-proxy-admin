import { getAllMailServer } from '@/service/main-service'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  mailServer: []
}

export const fetchMailServer = createAsyncThunk('mailServer', async (id: number) => {
  const { data } = await getAllMailServer(id)
  return data
})
const mailServerSlice = createSlice({
  name: 'mailServer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMailServer.fulfilled, (state, action: PayloadAction<any>) => {
      state.mailServer = action.payload
    })
  }
})

export default mailServerSlice
