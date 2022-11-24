import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  toasts: [],
}

// Add toast
export const addToast = createAsyncThunk('toast/add', async (toast, thunkAPI) => {
  return toast
})

export const removeToast = createAsyncThunk('toast/remove', async (index, thunkAPI) => {
  return index
})

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    resetToasts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToast.fulfilled, (state, action) => {
        state.toasts = [...state.toasts, action.payload]
      })
      .addCase(removeToast.fulfilled, (state, action) => {
        state.toasts = state.toasts.filter((item, index) => index !== action.payload)
      })
  },
})

export const { resetToasts } = toastSlice.actions
export default toastSlice.reducer
