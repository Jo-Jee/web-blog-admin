import LoginRes from '@interfaces/TokenResponse'
import User from '@interfaces/User'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from '@utils/api'
import { removeToken } from '@utils/token'

export interface UserState {
  user?: User
  status: 'loading' | 'login' | 'logout'
}

const initialState: UserState = {
  status: 'loading',
}

export const getMyProfile = createAsyncThunk('user/getMyProfile', async () => {
  const res = await API.user.get<User>('/my-profile')
  return res.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = undefined
      state.status = 'logout'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = 'login'
      })
      .addCase(getMyProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getMyProfile.rejected, (state) => {
        removeToken()
        state.status = 'logout'
      })
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
