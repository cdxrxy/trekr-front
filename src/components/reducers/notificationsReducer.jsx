import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../constants'
import { authHeader } from '../utils/authHeader'
import { addToast } from './toastComposeReducer'

const initialState = {
  isLoading: true,
  data: null,
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotificationsList: (state, action) => {
      state.data = {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(updateNotificationsIsSeen.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNotificationsIsSeen.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(updateNotificationsIsSeen.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications/`, { headers: authHeader() })
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

export const updateNotificationsIsSeen = createAsyncThunk(
  'notifications/updateNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/notifications/all`,
        {},
        { headers: authHeader() },
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

export const { clearNotificationsList } = notificationsSlice.actions

export default notificationsSlice.reducer
