import { getUser } from '@/service/user'
import { Roles } from '@/types/roles'
import { User } from '@/types/user'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  user: User
}
const initialState: InitialState = {
  user: {
    id: 0,
    name: '',
    roles: []
  }
}

export const fetchUser = createAsyncThunk('user', async (id: number) => {
  const { data } = await getUser(id)
  return data
})
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateRoles(state, action: PayloadAction<Roles>) {
      state.user.roles = action.payload.roles
      state.user.id = action.payload.id
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user.name = action.payload.name
    })
  }
})

export const { updateRoles } = userSlice.actions
export default userSlice
