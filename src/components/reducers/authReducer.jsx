import isExpired from '../utils/isExpired'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import { addToast } from './toastComposeReducer'

const userStorage = JSON.parse(localStorage.getItem('user'))

const user = userStorage ? (isExpired(userStorage?.accessToken) ? null : userStorage) : null
if (!user) {
  localStorage.removeItem('user')
}

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    const response = await authService.register(user)
    thunkAPI.dispatch(
      addToast({
        title: 'Success',
        type: 'success',
        body: 'User was successfully registered',
      }),
    )

    return 'success'
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    thunkAPI.dispatch(addToast({ title: 'Error', type: 'error', body: message }))
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    thunkAPI.dispatch(addToast({ title: 'Error', type: 'error', body: message }))
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
        state.message = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
