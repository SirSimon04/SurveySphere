import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    login: (state, action) => {
        state.jwt = action.payload.jwt;
        state.mail = action.payload.mail;
        state.id = action.payload.id;
        state.userName = action.payload.userName
    }
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { login } = authSlice.actions

export default authSlice.reducer