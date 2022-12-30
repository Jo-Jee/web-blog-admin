import Login from 'src/pages/Login'
import { useAppDispatch, useAppSelector } from '@store'
import Home from '@pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@components/Layout'
import Users from '@pages/Users'
import ManagePosts from '@pages/ManagePosts'
import NewPost from '@pages/NewPost'
import { getMyProfile, userActions } from '@slices/userSlice'
import { reloadToken } from '@utils/token'
import { useEffect } from 'react'

function App() {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.user)

  useEffect(() => {
    try {
      reloadToken()
      dispatch(getMyProfile())
    } catch (error) {
      dispatch(userActions.clearUser())
    }
  }, [dispatch])

  switch (status) {
    case 'login':
      return (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/posts/manage" element={<ManagePosts />} />
              <Route path="/posts/new" element={<NewPost />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )
    case 'loading':
      return <div>로딩중...</div>
    default:
      return <Login />
  }
}

export default App
