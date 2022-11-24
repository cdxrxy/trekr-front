import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  isLoading: true,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCalendar.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(fetchCalendar.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const fetchCalendar = createAsyncThunk('employees/fetchCalendar', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/calendars/`, { headers: authHeader() })
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

export const {} = calendarSlice.actions

export default calendarSlice.reducer
