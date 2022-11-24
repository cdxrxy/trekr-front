// booking for specific date selector
export const selectDataBookingsForDate = (state) => state.bookings.data
export const selectLoadingBookingsForDate = (state) => state.bookings.isLoading
export const selectBookingsForDate = (state) => state.bookings

// select all bookings
export const selectAllBookings = (state) => state.bookings?.list

export const selectIsBookingsLoading = (state) => state.bookings.isLoading
