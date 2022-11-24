import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  isLoading: true,
  result: {},
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForm.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchForm.fulfilled, (state, action) => {
        state.isLoading = false
        state.result = action.payload
      })
      .addCase(fetchForm.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const fetchForm = createAsyncThunk('form/fetchFormById', async (formId, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/booking-forms/${formId}`, {
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

export const {} = formSlice.actions

export default formSlice.reducer
