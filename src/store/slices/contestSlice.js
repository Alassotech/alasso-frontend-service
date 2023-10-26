import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  codeContest: [],
  filtered: [],
  loading: false,
  error:""
}

const contestSlice = createSlice({
  name: 'contest_slice',
  initialState,
  reducers: {},
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

const contestData = createAsyncThunk('contest_slice/contestData', async url => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    return error.message
  }
})

export default contestSlice.reducer
