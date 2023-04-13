import { User } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  profile: User
}
const initialState: InitialState = {
  profile: {
    name: '',
    proxyId: '',
    proxyPwd: ''
  }
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.profile = action.payload
    }
  }
})

export const { updateUser } = userSlice.actions
export default userSlice
