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

    if (token && !validateToken(token)) {
      try {
        const newToken = await reissueToken()
        config.headers.Authorization = `Bearer ${newToken}`
      } catch (e) {}
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

      if (
        config.baseURL === `${process.env.REACT_APP_API}/api/v1/auth` ||
        status !== 401
      )
        return Promise.reject(err)

      try {
        const accessToken = await reissueToken()
        config.headers.Authorization = `Bearer ${accessToken}`
      } catch (e) {}

      return axios(config)
    }
  )
  return client
}
