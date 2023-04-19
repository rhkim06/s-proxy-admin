import { getUserProfile } from '@/service/user'
import { User, UserProfile } from '@/types/user'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  user: User
  userProfile: UserProfile
}
const initialState: InitialState = {
  user: {
    id: 0
  },
  userProfile: {
    name: ''
  }
}

export const fetchUserProfile = createAsyncThunk('userProfile', async (id: number) => {
  const { data } = await getUserProfile(id)
  return data
})
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload
    })
  }
})

export const { updateUser } = userSlice.actions
export default userSlice
