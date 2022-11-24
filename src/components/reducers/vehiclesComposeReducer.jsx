import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  data: {
    number: '',
    capacity: '',
    length: 10,
    height: '',
    max_load: 0,
    completed: [],
    assigned: [],
  },
  isLoading: false,
}

export const vehicleComposeSlice = createSlice({
  name: 'vehicle/compose',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewVehicle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewVehicle.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(addNewVehicle.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const addNewVehicle = createAsyncThunk('vehicle/create', async (form, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/vehicles/add`, form, { headers: authHeader() })
    thunkAPI.dispatch(
      addToast({ title: 'Success', type: 'success', body: 'Vehicle has been added' }),
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
})

export const updateVehicle = createAsyncThunk('vehicle/update', async (form, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/vehicles/`, form, { headers: authHeader() })
    thunkAPI.dispatch(
      addToast({
        title: 'Success',
        type: 'success',
        body: 'Vehicle has been updated',
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
})

export const deleteVehicle = createAsyncThunk('vehicle/delete', async (form, thunkAPI) => {
  try {
    await axios.delete(`${BASE_URL}/vehicles/`, { headers: authHeader(), data: form })
    thunkAPI.dispatch(
      addToast({
        title: 'Success',
        type: 'success',
        body: 'Vehicle has been deleted',
      }),
    )
    return form._id
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    thunkAPI.dispatch(addToast({ title: 'Error', type: 'error', body: message }))
    return thunkAPI.rejectWithValue(message)
  }
})

export const {} = vehicleComposeSlice.actions

export default vehicleComposeSlice.reducer
