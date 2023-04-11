import { configureStore } from '@reduxjs/toolkit'
import testSlice from './module/test'
const store = configureStore({
  reducer: {
    [testSlice.name]: testSlice.reducer
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
