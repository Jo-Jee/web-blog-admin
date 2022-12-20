import LoginRes from '@interfaces/LoginRes'
import { removeAuthorizationHeader, setAuthorizationHeader } from './api'

export function setToken(tokens: LoginRes) {
  localStorage.setItem('accessToken', tokens.accessToken)
  localStorage.setItem('refreshToken', tokens.refreshToken)

  setAuthorizationHeader(tokens.accessToken)
}

export function removeToken() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  removeAuthorizationHeader()
}
