import Login from 'src/pages/Login'
import { useSelector } from 'react-redux'
import { RootState } from '@store'
import Home from 'src/pages/Home'

function App() {
  const user = useSelector((state: RootState) => state.user)

  if (user.accessToken && user.refreshToken) return <Home />

  return <Login />
}

export default App
