import LoginRes from '@interfaces/LoginRes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  uid?: number
}

const initialState: UserState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginRes>) => {},
    clearUser: (state) => {
      state.uid = undefined
    },
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
