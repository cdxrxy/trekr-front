import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'
import { addNewEmployee, updateEmployee, deleteEmployee } from './employeeComposeReducer'

const initialState = {
  isLoading: true,
  list: [],
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearEmployeesList: (state, action) => {
      state.list = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.employees
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.list = action.payload?.employees
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.list = action.payload?.employees
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((employee) => employee._id !== action.payload)
      })
  },
})

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/employees/`, { headers: authHeader() })
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

export const { addNewEmployeeToTheList, clearEmployeesList, updateEmployeeInList } =
  employeesSlice.actions

export default employeesSlice.reducer
