import { configureStore } from '@reduxjs/toolkit'
import contestSlice from './slices/contestSlice'
import coursesSlice from './slices/coursesSlices'
import authSlice from './slices/authSlice'
export const store = configureStore({
  reducer: {
    contest: contestSlice,
    course: coursesSlice,
    auth: authSlice
  }
})
