import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../constants'

import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  isLoading: true,
  data: null,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearSettingsData: (state, action) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/`, {
      headers: authHeader(),
    })
    return response.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    thunkAPI.dispatch(addToast({ title: 'Error', type: 'error', body: message }))
    return thunkAPI.rejectWithValue(message)
  }
})

export const { clearSettingsData } = settingsSlice.actions

export default settingsSlice.reducer
