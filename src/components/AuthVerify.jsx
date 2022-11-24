import isExpired from './utils/isExpired'
import { logout } from './reducers/authReducer'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

// Component to check users jwt token expiration while routing
const AuthVerify = () => {
  let location = useLocation()
  let dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && isExpired(user?.accessToken)) {
      dispatch(logout())
    }
  }, [location, dispatch])

  return <></>
}

export default AuthVerify
