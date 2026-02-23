import { configureStore } from '@reduxjs/toolkit'
import CartReducer from "./CartSlice"
  const appStore = configureStore({
  reducer: {
    Cart:CartReducer
  },
})
export default appStore;