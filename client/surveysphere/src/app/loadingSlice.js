import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, action) => {
        console.log("dispatched")
        state.isLoading = action.payload.status
    }
  },
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer