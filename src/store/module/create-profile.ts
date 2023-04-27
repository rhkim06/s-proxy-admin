import { getName } from '@/service/create-profile'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fetchName = createAsyncThunk('name', async () => {
  const { data } = await getName()
  return data.data.name
})
const initialState = {
  name: ''
}
const createProfileSlice = createSlice({
  name: 'createProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchName.fulfilled, (state, action: PayloadAction<any>) => {
      state.name = action.payload
    })
  }
})

export default createProfileSlice
