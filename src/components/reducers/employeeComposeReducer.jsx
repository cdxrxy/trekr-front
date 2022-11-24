import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { addToast } from './toastComposeReducer'
import { authHeader } from '../utils/authHeader'
import { BASE_URL } from '../constants'

const initialState = {
  data: {
    fullname: '',
    email: '',
    phone: 0,
    role: 'helper',
    rate: 0,
    completed: 0,
    assigned: [],
  },
  isLoading: false,
}

export const employeeComposeSlice = createSlice({
  name: 'employee/compose',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(addNewEmployee.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const addNewEmployee = createAsyncThunk('employee/create', async (form, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/employees/add`, form, { headers: authHeader() })
    thunkAPI.dispatch(
      addToast({
        title: 'Success',
        type: 'success',
        body: 'Employee has been created',
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

export const updateEmployee = createAsyncThunk('employee/update', async (form, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/employees/`, form, {
      headers: authHeader(),
    })
    thunkAPI.dispatch(
      addToast({
        title: 'Success',
        type: 'success',
        body: 'Employee has been updated',
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

export const deleteEmployee = createAsyncThunk('employee/delete', async (form, thunkAPI) => {
  try {
    await axios.delete(`${BASE_URL}/employees/`, { headers: authHeader(), data: form })
    thunkAPI.dispatch(
      addToast({
        title: 'Success',
        type: 'success',
        body: 'Employee has been deleted',
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

export const {} = employeeComposeSlice.actions

export default employeeComposeSlice.reducer
