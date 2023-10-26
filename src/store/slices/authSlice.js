import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false
}

const authSlice = createSlice({
  name: 'auth_slice',
  initialState,
  reducers: {
    logout: state => {
      state.token = null((state.isAuthenticated = false))((state.user = null))
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.token = action.payload
      state.loading = false
    })
  }
})

export const login = createAsyncThunk(
  'auth_slice/login',
  async (url, email, password) => {
    try {
      const response = await axios.post(url, { email, password })
      const token = response.data.access_token
      return token
    } catch (error) {
      throw error
    }
  }
)

export const { logout } = authSlice.actions

export default authSlice.reducer
