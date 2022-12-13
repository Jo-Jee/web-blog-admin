import LoginRes from '@interfaces/LoginRes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: UserState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<LoginRes>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },
})
