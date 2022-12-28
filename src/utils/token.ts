import AccessTokenPayload from '@interfaces/AccessTokenPayload'
import LoginRes from '@interfaces/LoginRes'
import RefreshTokenPayload from '@interfaces/RefreshTokenPayload'
import jwtDecode from 'jwt-decode'
import { removeAuthorizationHeader, setAuthorizationHeader } from './api'

export function setToken(tokens: LoginRes) {
  const { accessToken, refreshToken } = tokens
  const accessTokenPayload = jwtDecode<AccessTokenPayload>(accessToken)
  const refreshTokenPayload = jwtDecode<RefreshTokenPayload>(refreshToken)
  const accessTokenExp = accessTokenPayload.exp
  const refreshTokenExp = refreshTokenPayload.exp
  const now = Date.now()

  if (now > accessTokenExp || now > refreshTokenExp)
    throw Error('token expired')

  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  localStorage.setItem('accessTokenExp', accessTokenExp.toString())
  localStorage.setItem('refreshToken', refreshTokenExp.toString())

  setAuthorizationHeader(tokens.accessToken)
}

export function removeToken() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessTokenExp')
  localStorage.seremoveItemtItem('refreshToken')

  removeAuthorizationHeader()
}
