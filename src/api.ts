import axios from 'axios'

export const API = {
  auth: axios.create({
    baseURL: `${process.env.REACT_APP_API}/api/v1/auth`,
  }),
}

export const setAuthorizationHeader = (token: string) => {
  for (const [, client] of Object.entries(API)) {
    client.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}
