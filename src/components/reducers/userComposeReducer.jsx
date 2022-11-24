import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  fullname: '',
  email: '',
  phone: '',
  role: 'owner',
  generatedForm: '',
  accessRights: [],
  isLoading: false,
}

export const userComposeSlice = createSlice({
  name: 'user/compose',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state = action.payload
        state.isLoading = false
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const addNewUser = createAsyncThunk('user/create', async (form, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/`, form, { headers: authHeader() })
    thunkAPI.dispatch(
      addToast({ title: 'Success', type: 'success', body: 'User has been created' }),
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

export const {} = userComposeSlice.actions

export default userComposeSlice.reducer
