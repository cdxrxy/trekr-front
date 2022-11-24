import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  isLoading: true,
  list: [],
}

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearPropertiesList: (state, action) => {
      state.list = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.concat(action.payload)
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/properties/list`, { headers: authHeader() })
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

export const { clearPropertiesList } = propertiesSlice.actions

export default propertiesSlice.reducer
