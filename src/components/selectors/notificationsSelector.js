// employees list selector
export const selectNotifications = (state) => state.notifications

export const selectNotificationsList = (state) => state.notifications?.data?.events
export const selectIsNotificationsLoading = (state) => state.notifications.isLoading
