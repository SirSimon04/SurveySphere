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
      state.userName = action.payload.userName;
    },
    logout: (state, _) => {
      state.jwt = null;
      state.mail = null;
      state.id = null;
      state.userName = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer