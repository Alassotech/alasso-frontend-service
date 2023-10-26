import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  courses: [],
  nptel: [],
  loading: false
}
const courseSlice = createSlice({
  name: 'fetch_course',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCourses.pending, state => {
        state.loading = true
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload
        state.loading = false
      })
      .addCase(fetchNptel.pending, state => {
        state.loading = true
      })
      .addCase(fetchNptel.fulfilled, (state, action) => {
        state.nptel = action.payload
        state.loading = false
      })
  }
})

export const fetchCourses = createAsyncThunk(
  'fetch_course/courses',
  async url => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw error
    }
  }
)
export const fetchNptel = createAsyncThunk('fetch_course/nptel', async url => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error
  }
})

export default courseSlice.reducer
