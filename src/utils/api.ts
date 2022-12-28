import axios from 'axios'

export const API = {
  auth: createAPIClient(`${process.env.REACT_APP_API}/api/v1/auth`),
  user: createAPIClient(`${process.env.REACT_APP_API}/api/v1/user`),
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

  client.interceptors.request.use((config) => {
    return config
  })

  client.interceptors.response.use(
    (res) => {
      console.log(res)
      return res
    },
    async (err) => {
      const {
        config,
        response: { status },
      } = err

      console.log(status)
      return Promise.reject(err)
    }
  )
  return client
}
