import LoginRes from '@interfaces/LoginRes'
import { userActions } from '@slices/userSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { API } from 'src/api'
import { setToken } from 'src/utils'

function Login() {
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const { email, password } = inputs

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await API.auth.post<LoginRes>('/login', {
      email: email,
      password: password,
    })

    setToken(res.data)
    dispatch(userActions.setToken(res.data))
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={login}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="text"
              placeholder="example@email.com"
              value={email}
              onChange={onChange}
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={onChange}
            />
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
