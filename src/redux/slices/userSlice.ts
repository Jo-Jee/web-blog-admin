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
    removeToken: (state) => {
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
