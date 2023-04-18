import { configureStore } from '@reduxjs/toolkit'
import authSlice from './module/auth'
import dynamicIpSlice from './module/dynamicIp'
import staticIpSlice from './module/staticIp'
import testSlice from './module/test'
import userSlice from './module/user'
const store = configureStore({
  reducer: {
    [testSlice.name]: testSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [staticIpSlice.name]: staticIpSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [dynamicIpSlice.name]: dynamicIpSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 }
    })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
