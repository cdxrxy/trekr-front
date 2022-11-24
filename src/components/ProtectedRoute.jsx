import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from './atoms/Loader'
import { selectBookingFormId } from './selectors/userSelector'
import { useDispatch } from 'react-redux'
import { fetchUser } from './reducers/usersReducer'
import { fetchEmployees } from './reducers/employeesReducer'
import { fetchVehicles } from './reducers/vehiclesReducer'
import { fetchBookingForm } from './reducers/bookingFormsReducer'
import { fetchNotifications } from './reducers/notificationsReducer'
import { fetchSettings } from './reducers/settingsReducer'
import { fetchAllBookings } from './reducers/bookingsReducer'

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children, isFetchUser }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const bookingFormId = useSelector(selectBookingFormId)

  const hydrateStore = async () => {
    dispatch(fetchEmployees())
    dispatch(fetchVehicles())
    await dispatch(fetchBookingForm(bookingFormId))
    dispatch(fetchNotifications())
    dispatch(fetchSettings())
    dispatch(fetchAllBookings())
  }

  useEffect(() => {
    if (isAllowed && isFetchUser) {
      dispatch(fetchUser())
    }
  }, [dispatch, isAllowed, isFetchUser])

  useEffect(() => {
    if (bookingFormId) {
      hydrateStore().then(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      })
    }
  }, [dispatch, bookingFormId])

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  if (isLoading && isFetchUser) {
    return <Loader />
  }

  return children ? children : <Outlet />
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  isFetchUser: PropTypes.bool,
}

export default ProtectedRoute
