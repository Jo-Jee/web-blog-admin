import axios from 'axios'
import React, { useState } from 'react'

function Login() {
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

  const login = () => {
    console.log(email, password)
    axios.post('http://localhost:8080', {
      email: email,
      password: password
    })
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={onChange}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={() => login()}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
