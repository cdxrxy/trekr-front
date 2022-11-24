import axios from 'axios'
import { BASE_URL } from '../constants'

// Register user
const register = async (userData) => {
  const response = await axios.post(BASE_URL + '/auth/register', userData)

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(BASE_URL + '/auth/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
