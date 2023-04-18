import { getDynamicIp } from '@/service/dynamic'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type DynamicIp = {
  ip: string
  port: number
  proxyId: string
  proxyPassword: string
}
type InitialState = {
  dynamicIp: DynamicIp
}
const initialState: InitialState = {
  dynamicIp: {
    ip: 'proxy.jxit360.net',
    port: 2029,
    proxyId: '',
    proxyPassword: ''
  }
}
export const fetchDynamicIpInfo = createAsyncThunk('dynamicIpInfo', async (id: number) => {
  const { data } = await getDynamicIp(id)
  return data
})
const dynamicIpSlice = createSlice({
  name: 'dynamic',
  initialState,
  reducers: {
    updateDynamicIp(state, action: PayloadAction<any>) {
      state.dynamicIp.proxyId = action.payload.proxyId
      state.dynamicIp.proxyPassword = action.payload.proxyPassword
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDynamicIpInfo.fulfilled, (state, action: PayloadAction<any>) => {
      state.dynamicIp.proxyId = action.payload.proxyId
      state.dynamicIp.proxyPassword = action.payload.proxyPwd
    })
  }
})

export const { updateDynamicIp } = dynamicIpSlice.actions
export default dynamicIpSlice
