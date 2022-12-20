import Login from 'src/pages/Login'
import { useSelector } from 'react-redux'
import { RootState } from '@store'
import Home from '@pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@components/Layout'
import Users from '@pages/Users'
import Posts from '@pages/Posts'

function App() {
  const user = useSelector((state: RootState) => state.user)

  if (user.accessToken && user.refreshToken)
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    )

  return <Login />
}

export default App
