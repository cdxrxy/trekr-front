import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL, inputTypes } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  data: {
    label: '',
    type: inputTypes.text,
    required: true,
  },
  isLoading: false,
}

export const bookingFormComposeSlice = createSlice({
  name: 'bookingForm/compose',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrUpdateBookingForm.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrUpdateBookingForm.fulfilled, (state, action) => {
        state = action.payload
        state.isLoading = false
      })
      .addCase(createOrUpdateBookingForm.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const createOrUpdateBookingForm = createAsyncThunk(
  'bookingForm/create-or-update',
  async (form, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/booking-forms/`, form, {
        headers: authHeader(),
      })
      thunkAPI.dispatch(
        addToast({
          title: 'Success',
          type: 'success',
          body: 'Form created successfully',
        }),
      )
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

export const {} = bookingFormComposeSlice.actions

export default bookingFormComposeSlice.reducer
