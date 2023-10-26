import { configureStore } from '@reduxjs/toolkit'
import contestSlice from './slices/contestSlice'
import coursesSlice from './slices/coursesSlices'
import AuthSlice from './slices/AuthSlice'
export const store = configureStore({
  reducer: {
    contest: contestSlice,
    course: coursesSlice,
    auth: AuthSlice
  }
})
