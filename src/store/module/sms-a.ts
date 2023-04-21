import { getPhoneNumber, getPlatformPriceByCountry, getVefiryHistory, getVerifyCode } from '@/service/sms-a'
import { Country } from '@/types/ip'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type PlatformPrice = {
  platform: string
  country: Country
  price: number
  countryId: number
  platformId: number
}

type InitialState = {
  platformPrices: PlatformPrice[]
  requestId: number
  phoneNumber: any
  verifyRes: any
  verifyHistory: any[]
}
const initialState: InitialState = {
  platformPrices: [],
  requestId: 0,
  phoneNumber: {},
  verifyRes: {},
  verifyHistory: []
}

export const fetchPlatformPrice = createAsyncThunk('platformprice', async (country: Country) => {
  const { data } = await getPlatformPriceByCountry(country)
  return data
})

export const fetchPhoneNumber = createAsyncThunk('phoneNumber', async (payload: any) => {
  const { platformId, countryId } = payload
  const { data } = await getPhoneNumber(platformId, countryId)
  return data
})
export const fetchVerifyCode = createAsyncThunk('verifycode', async (requestId: number) => {
  const { data } = await getVerifyCode(requestId)
  return data
})
export const fetchVerifyHistory = createAsyncThunk('vefiryHistory', async (userId: number) => {
  const { data } = await getVefiryHistory(userId)
  return data
})
const smsASlice = createSlice({
  name: 'smsA',
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(fetchPlatformPrice.fulfilled, (state, action: PayloadAction<any>) => {
        state.platformPrices = action.payload
      })
      .addCase(fetchPhoneNumber.fulfilled, (state, action: PayloadAction<any>) => {
        state.phoneNumber = action.payload
      })
      .addCase(fetchPhoneNumber.rejected, (state, action: PayloadAction<any>) => {
        state.phoneNumber = action.payload
      })
      .addCase(fetchVerifyCode.fulfilled, (state, action: PayloadAction<any>) => {
        state.verifyRes = action.payload
      })
      .addCase(fetchVerifyHistory.fulfilled, (state, action: PayloadAction<any>) => {
        state.verifyHistory = action.payload
      })
  }
})

export default smsASlice
