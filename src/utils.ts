import LoginRes from '@interfaces/LoginRes'
import { setAuthorizationHeader } from './api'

export function setToken(tokens: LoginRes) {
  localStorage.setItem('accessToken', tokens.accessToken)
  localStorage.setItem('refreshToken', tokens.refreshToken)

  setAuthorizationHeader(tokens.accessToken)
}
