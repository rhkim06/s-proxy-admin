import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  token: string
}
const initialState: InitialState = {
  token: ''
}
const authSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    }
  }
})

export const { updateToken } = authSlice.actions
export default authSlice
