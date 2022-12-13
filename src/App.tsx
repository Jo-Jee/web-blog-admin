import Login from '@components/Login'
import { useSelector } from 'react-redux'
import { RootState } from '@store'

function App() {
  const user = useSelector((state: RootState) => state.user)

  if (user.accessToken && user.refreshToken) return <div>로그인 완료</div>

  return <Login />
}

export default App
