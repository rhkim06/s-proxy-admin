import { getStaticIps } from '@/service/static'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
type InitialState = {
  staticIpList: any[]
  total: number
}
const initialState: InitialState = {
  staticIpList: [],
  total: 0
}

export const fetchStaticIpList = createAsyncThunk('staticIpList', async (payload: any) => {
  const { data } = await getStaticIps(payload)
  return data
})
const staticIpSlice = createSlice({
  name: 'staticIp',
  initialState,
  reducers: {
    updateStaticIpList(state, action: PayloadAction<any>) {
      state.staticIpList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStaticIpList.fulfilled, (state, action: PayloadAction<any>) => {
      state.staticIpList = action.payload.res
      state.total = action.payload.total
    })
  }
})

export const { updateStaticIpList } = staticIpSlice.actions
export default staticIpSlice
