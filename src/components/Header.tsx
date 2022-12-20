import { userActions } from '@slices/userSlice'
import { useDispatch } from 'react-redux'
import { removeToken } from 'src/utils'

export default function Header() {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(userActions.removeToken())
    removeToken()
  }

  return (
    <div className="bg-white shadow-sm h-14 flex justify-between items-center px-8">
      <div>이거</div>
      <div>
        <button onClick={onLogout}>로그아웃</button>
      </div>
    </div>
  )
}
