import axios from 'axios'
import { reissueToken, validateToken } from './token'

export const API = {
  auth: createAPIClient(`${process.env.REACT_APP_API}/api/v1/auth`),
  user: createAPIClient(`${process.env.REACT_APP_API}/api/v1/users`),
  blog: createAPIClient(`${process.env.REACT_APP_API}/api/v1/blog`),
}

export const setAuthorizationHeader = (token: string) => {
  for (const [, client] of Object.entries(API)) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const removeAuthorizationHeader = () => {
  for (const [, client] of Object.entries(API)) {
    delete client.defaults.headers.common['Authorization']
  }
}

function createAPIClient(url: string) {
  const client = axios.create({
    baseURL: url,
  })

  client.interceptors.request.use(async (config) => {
    if (config.baseURL === `${process.env.REACT_APP_API}/api/v1/auth`)
      return config

    config.headers = config.headers ?? {}
    const token = config.headers.Authorization?.toString().substring(
      'Bearer '.length
    )

    if (token) {
      if (!validateToken(token)) {
        const refreshToken = localStorage.getItem('refreshToken')

        if (refreshToken) {
          if (validateToken(refreshToken)) {
            const newToken = await reissueToken(refreshToken)
            config.headers.Authorization = `Bearer ${newToken}`
          }
        }
      }
    }

    return config
  })

  client.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const {
        config,
        response: { status },
      } = err
      return Promise.reject(err)
    }
  )
  return client
}
