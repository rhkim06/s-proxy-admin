import { User } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  user: User
}
const initialState: InitialState = {
  user: {
    id: 0
  }
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    }
  }
})

export const { updateUser } = userSlice.actions
export default userSlice
