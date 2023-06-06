import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../components/Auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer
  }
})