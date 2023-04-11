import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  test: {
    count: 0
  }
}
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateCount(state, action: PayloadAction<number>) {
      state.test.count += action.payload
    }
  }
})

export const { updateCount } = testSlice.actions
export default testSlice
