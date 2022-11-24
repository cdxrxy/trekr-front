import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'
import { addNewVehicle, deleteVehicle, updateVehicle } from './vehiclesComposeReducer'

const initialState = {
  isLoading: true,
  list: [],
}

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    clearVehiclesList: (state, action) => {
      state.data = {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload?.vehicles
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(addNewVehicle.fulfilled, (state, action) => {
        state.list = action.payload?.vehicles
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.list = action.payload?.vehicles
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.list = state.list.filter((vehicle) => vehicle._id !== action.payload)
      })
  },
})

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicles/`, { headers: authHeader() })
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

export const { clearVehiclesList } = vehiclesSlice.actions

export default vehiclesSlice.reducer
