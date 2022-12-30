import { userActions } from '@slices/userSlice'
import { useState } from 'react'
import { removeToken } from '@utils/token'
import { useAppDispatch, useAppSelector } from '@store'

export default function Header() {
  const [showSetting, setShowSetting] = useState(false)
  const { user } = useAppSelector((state) => state.user)

  const onProfileClick = () => {
    setShowSetting(!showSetting)
  }
  return (
    <div className="bg-white drop-shadow h-16 shrink-0 grow-0 flex justify-between items-center px-8 z-10">
      <div></div>
      <div
        className="flex items-center hover:cursor-pointer"
        onClick={onProfileClick}
      >
        <img
          alt="profile"
          className="rounded-full w-10 h-10 bg-slate-200"
          src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"
        ></img>
        <div className="ml-3">{user?.email}</div>
      </div>
      {showSetting && <SettingPanel />}
    </div>
  )
}

function SettingPanel() {
  const dispatch = useAppDispatch()
  const onLogout = () => {
    dispatch(userActions.clearUser())
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
