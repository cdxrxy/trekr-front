import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  isLoading: true,
  data: null,
  specificBooking: null,
  list: {},
}

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(fetchBookingsForDate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBookingsForDate.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchBookingsForDate.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(fetchBookingByIdAndDate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBookingByIdAndDate.fulfilled, (state, action) => {
        state.isLoading = false
        state.specificBooking = action.payload
      })
      .addCase(fetchBookingByIdAndDate.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const fetchAllBookings = createAsyncThunk(
  'bookings/fetchAllBookings',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/`, { headers: authHeader() })
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()

      thunkAPI.dispatch(addToast({ title: 'Error', type: 'error', body: message }))
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const fetchBookingsForDate = createAsyncThunk(
  'bookings/fetchBookingsForDate',
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/${date}`, { headers: authHeader() })
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()

      thunkAPI.dispatch(addToast({ title: 'Error', type: 'error', body: message }))
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const fetchBookingByIdAndDate = createAsyncThunk(
  'bookings/fetchBookingByIdAndDate',
  async ({ id, date }, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/get?id=${id}&date=${date}`, {
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
  },
)

export const {} = bookingsSlice.actions

export default bookingsSlice.reducer
