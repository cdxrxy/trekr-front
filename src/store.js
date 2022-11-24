import { configureStore } from '@reduxjs/toolkit'

// Reducers
import authReducer from './components/reducers/authReducer'
import bookingsReducer from './components/reducers/bookingsReducer'
import bookingComposeReducer from './components/reducers/bookingComposeReducer'
import calendarReducer from './components/reducers/calendarReducer'
import employeesReducer from './components/reducers/employeesReducer'
import employeeComposeReducer from './components/reducers/employeeComposeReducer'
import formReducer from './components/reducers/formReducer'
import propertiesReducer from './components/reducers/propertiesReducer'
import propertyComposeReducer from './components/reducers/propertyComposeReducer'
import toastComposeReducer from './components/reducers/toastComposeReducer'
import usersReducer from './components/reducers/usersReducer'
import userComposeReducer from './components/reducers/userComposeReducer'
import vehiclesReducer from './components/reducers/vehiclesReducer'
import vehiclesComposeReducer from './components/reducers/vehiclesComposeReducer'
import settingsComposeReducer from './components/reducers/settingsComposeReducer'
import settingsReducer from './components/reducers/settingsReducer'
import bookingFormsReducer from './components/reducers/bookingFormsReducer'
import bookingFormComposeReducer from './components/reducers/bookingFormComposeReducer'
import notificationsReducer from './components/reducers/notificationsReducer'

export default configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
    bookingCompose: bookingComposeReducer,
    calendar: calendarReducer,
    employees: employeesReducer,
    employeeCompose: employeeComposeReducer,
    form: formReducer,
    properties: propertiesReducer,
    propertyCompose: propertyComposeReducer,
    toast: toastComposeReducer,
    userCompose: userComposeReducer,
    user: usersReducer,
    vehicles: vehiclesReducer,
    vehicleCompose: vehiclesComposeReducer,
    settingsCompose: settingsComposeReducer,
    settings: settingsReducer,
    bookingForms: bookingFormsReducer,
    bookingFormCompose: bookingFormComposeReducer,
    notifications: notificationsReducer,
  },
})
