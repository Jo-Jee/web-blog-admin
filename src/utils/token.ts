import AccessTokenPayload from '@interfaces/AccessTokenPayload'
import RefreshTokenPayload from '@interfaces/RefreshTokenPayload'
import TokenResponse from '@interfaces/TokenResponse'
import jwtDecode from 'jwt-decode'
import { API, removeAuthorizationHeader, setAuthorizationHeader } from './api'

export function setToken(accessToken: string, refreshToken: string) {
  if (!validateToken(accessToken) || !validateToken(refreshToken))
    throw Error('token expired')

  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)

  setAuthorizationHeader(accessToken)
}

export function removeToken() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  removeAuthorizationHeader()
}

export function reloadToken() {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) throw Error('Access Token missing')

  if (validateToken(accessToken)) {
    setAuthorizationHeader(accessToken)
  } else {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) throw Error('Refresh Token missing')
    if (validateToken(refreshToken)) {
      reissueToken(refreshToken)
    }
  }

  return false
}

function validateToken(token: string) {
  try {
    const tokenExp = jwtDecode<AccessTokenPayload | RefreshTokenPayload>(
      token
    ).exp
    const now = Date.now()

    return now > tokenExp
  } catch (e) {
    removeToken()
    return false
  }
}

async function reissueToken(refreshToken: string) {
  const res = await API.auth.get<TokenResponse>('/reissue', {
    data: {
      refreshToken: refreshToken,
    },
  })

  setToken(res.data.accessToken, res.data.refreshToken)
}
