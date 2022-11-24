import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  isLoading: true,
  data: null,
}

export const bookingFormsSlice = createSlice({
  name: 'bookingForms',
  initialState,
  reducers: {
    clearPropertiesList: (state, action) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingForm.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBookingForm.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchBookingForm.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const fetchBookingForm = createAsyncThunk(
  'bookingForms/fetchBookingForm',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/booking-forms/${id}`, {
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

export const { clearPropertiesList } = bookingFormsSlice.actions

export default bookingFormsSlice.reducer
