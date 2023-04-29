import { configureStore } from '@reduxjs/toolkit'
import authSlice from './module/auth'
import createProfileSlice from './module/create-profile'
import dynamicIpSlice from './module/dynamicIp'
import imageServerSlice from './module/image-server'
import ipCheckSlice from './module/ip-check'
import mailServerSlice from './module/mail-server'
import smsASlice from './module/sms-a'
import staticIpSlice from './module/staticIp'
import testSlice from './module/test'
import userSlice from './module/user'
const store = configureStore({
  reducer: {
    [testSlice.name]: testSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [staticIpSlice.name]: staticIpSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [dynamicIpSlice.name]: dynamicIpSlice.reducer,
    [smsASlice.name]: smsASlice.reducer,
    [mailServerSlice.name]: mailServerSlice.reducer,
    [ipCheckSlice.name]: ipCheckSlice.reducer,
    [imageServerSlice.name]: imageServerSlice.reducer,
    [createProfileSlice.name]: createProfileSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
