import { userActions } from '@slices/userSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeToken } from 'src/utils'

export default function Header() {
  const [showSetting, setShowSetting] = useState(false)

  const onProfileClick = () => {
    setShowSetting(!showSetting)
  }
  return (
    <div className="bg-white drop-shadow h-16 shrink-0 grow-0 flex justify-between items-center px-8">
      <div>이거</div>
      <div
        className="flex items-center hover:cursor-pointer"
        onClick={onProfileClick}
      >
        <img className="rounded-full w-10 h-10 bg-slate-200 p-1" src=""></img>
        <div className="ml-3">userName</div>
      </div>
      {showSetting && <SettingPanel />}
    </div>
  )
}

function SettingPanel() {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(userActions.removeToken())
    removeToken()
  }
  return (
    <div className="absolute right-0 top-16 m-1 bg-white w-40 p-2 rounded shadow">
      <ul>
        <li className="p-1">설정</li>
        <li className="p-1">프로필</li>
        <div className="h-[1px] my-2 bg-gray-400"></div>
        <li className="p-1">
          <button onClick={onLogout}>로그아웃</button>
        </li>
      </ul>
    </div>
  )
}
