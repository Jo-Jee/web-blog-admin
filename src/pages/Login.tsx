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
  const [error, setError] = useState('')

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
    const emailRegex: RegExp =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/

    if (!emailRegex.test(email)) {
      setError('이메일을 확인해주세요.')
      return
    } else if (!password) {
      setError('비밀번호를 입력해주세요.')
      return
    }
    try {
      const res = await API.auth.post<LoginRes>('/login', {
        email: email,
        password: password,
      })

      setToken(res.data)
      dispatch(userActions.setToken(res.data))
    } catch (e) {
      setError('이메일, 비밀번호를 확인해주세요.')
    }
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
              value={email}
              onChange={onChange}
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
            />
          </div>
          {error && <div className="mb-6 text-sm text-red-500">{error}</div>}
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
