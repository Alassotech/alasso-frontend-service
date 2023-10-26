import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  user: null,
  token: localStorage.getItem('access_token') || null,
  isLoggedIn: false,
  loading: false,
  role: 'user',
  error: null
}

const authSlice = createSlice({
  name: 'auth_slice',
  initialState,
  reducers: {
    logout: state => {
      state.token = null
      state.isLoggedIn = false
      state.user = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.token = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(validate.pending, state => {
        state.loading = true
      })
      .addCase(validate.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.user = action.payload.username
        state.role = action.payload.role
      })
  }
})

export const login = createAsyncThunk('auth_slice/login', async userdata => {
  try {
    const email = userdata?.email
    const password = userdata?.password
    const response = await axios.post('/user/login', { email, password })
    console.log('res', response)
    const token = response.data.access_token
    localStorage.setItem('access_token', token)
    return token
  } catch (error) {
    throw error
  }
})

export const validate = createAsyncThunk('auth_slice/validate', async url => {
  try {
    const response = await axios.post(url)
    const username = response?.data?.username
    const role = response?.data?.role
    return { username, role }
  } catch (error) {
    throw error
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
