import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  data: {
    startTime: '08:00',
    endTime: '18:00',
    secondShiftStart: '17:00',
  },
  isLoading: false,
}

export const settingsComposeSlice = createSlice({
  name: 'settings/compose',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSettings.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(addSettings.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const addSettings = createAsyncThunk('settings/create', async (form, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/settings/`, form, { headers: authHeader() })
    thunkAPI.dispatch(addToast({ title: 'Success', type: 'success', body: 'Your settings saved' }))
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

export const {} = settingsComposeSlice.actions

export default settingsComposeSlice.reducer
