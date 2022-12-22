import axios from 'axios'

export const API = {
  auth: axios.create({
    baseURL: `${process.env.REACT_APP_API}/api/v1/auth`,
  }),
  user: axios.create({
    baseURL: `${process.env.REACT_APP_API}/api/v1/user`,
  }),
  blog: axios.create({
    baseURL: `${process.env.REACT_APP_API}/api/v1/blog`,
  }),
}

export const setAuthorizationHeader = (token: string) => {
  for (const [, client] of Object.entries(API)) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const removeAuthorizationHeader = () => {
  for (const [, client] of Object.entries(API)) {
    client.defaults.headers.common['Authorization'] = undefined
  }
}
