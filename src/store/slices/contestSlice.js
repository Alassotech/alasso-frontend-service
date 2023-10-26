import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
const initialState = {
  codeContest: [],
  filtered: [],
  loading: false,
  error: '',
  filter: 'all'
}

const contestSlice = createSlice({
  name: 'contest_slice',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
      if (action.payload === 'all') {
        state.filtered = state.codeContest
      } else {
        state.filtered = state.codeContest.filter(contest => {
          return contest.site === action.payload
        })
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(contestData.pending, state => {
        state.loading = true
      })
      .addCase(contestData.fulfilled, (state, action) => {
        state.loading = false
        state.codeContest = action.payload
        state.filtered = action.payload
      })
      .addCase(contestData.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const contestData = createAsyncThunk(
  'contest_slice/contestData',
  async url => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      return error.message
    }
  }
)

export const {setFilter} = contestSlice.actions

export default contestSlice.reducer
