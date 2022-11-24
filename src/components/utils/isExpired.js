import jwt_decode from 'jwt-decode'

const isExpired = (token) => {
  if (token) {
    const decodedJwt = jwt_decode(token)
    return decodedJwt.exp * 1000 <= Date.now()
  }
  return false
}

export default isExpired
