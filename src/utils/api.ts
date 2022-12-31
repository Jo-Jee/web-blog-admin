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
    const token = config.headers?.Authorization?.toString().substring(
      'Bearer '.length
    )
    console.log(token)

    if (token) {
      if (!validateToken(token)) {
        const controller = new AbortController()
        console.log('??')
        controller.abort()
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
