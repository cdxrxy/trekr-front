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

export const propertyComposeSlice = createSlice({
  name: 'property/compose',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewProperty.fulfilled, (state, action) => {
        state = action.payload
        state.isLoading = false
      })
      .addCase(addNewProperty.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(updateProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state = action.payload
        state.isLoading = false
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const addNewProperty = createAsyncThunk('property/create', async (form, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/properties/`, form, { headers: authHeader() })
    thunkAPI.dispatch(
      addToast({
        title: 'Success',
        type: 'success',
        body: 'Property has been added',
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

export const updateProperty = createAsyncThunk(
  'property/update',
  async ({ id, form }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/properties/${id}`, form, {
        headers: authHeader(),
      })
      thunkAPI.dispatch(
        addToast({
          title: 'Success',
          type: 'success',
          body: 'Property has been updated',
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

export const {} = propertyComposeSlice.actions

export default propertyComposeSlice.reducer
