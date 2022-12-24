import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  fullname: '',
  email: '',
  phone: '',
  startDate: '',
  endDate: '',
  isLoading: false,
}

export const bookingComposeSlice = createSlice({
  name: 'booking/compose',
  initialState,
  reducers: {
    setPickupAddressList: (state, action) => {
      return {
        ...state,
        pickup: [action.payload],
      }
    },
    setDropoffAddressList: (state, action) => {
      return {
        ...state,
        dropoff: [action.payload],
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewEstimate.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(addNewEstimate.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const addNewEstimate = createAsyncThunk('booking/create', async ({ id, form }, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/estimate/send/${id}`, form, {
      headers: authHeader(),
    })
    await thunkAPI.dispatch(
      addToast({ title: 'Success', type: 'success', body: 'Your Estimate executed successfully' }),
    )
    window.location.href = 'http://127.0.0.1:3000/#/calendar'
    setTimeout(() => window.location.reload(), 3000)
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

export const { setPickupAddressList, setDropoffAddressList } = bookingComposeSlice.actions

export default bookingComposeSlice.reducer
