import { ipCheck } from '@/service/ip-check'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  ip: string
  country: string
  score: number
  risk: string
}
const initialState: InitialState = {
  ip: '',
  country: '',
  score: 0,
  risk: ''
}
export const fetchIpCheck = createAsyncThunk('ipCheck', async (ip?: string) => {
  const { data } = await ipCheck(ip)
  return data
})
const ipCheckSlice = createSlice({
  name: 'ipCheck',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIpCheck.fulfilled, (state, action: PayloadAction<any>) => {
      const { payload } = action
      state.ip = payload.ip
      state.country = payload.country
      state.risk = payload.risk
      state.score = payload.score
    })
  }
})

export default ipCheckSlice
