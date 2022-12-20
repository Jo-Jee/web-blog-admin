import { NavLink } from 'react-router-dom'

export default function Menu() {
  const menuItems = [
    {
      name: '포스트 관리',
      to: '/posts',
    },
    {
      name: '사용자 관리',
      to: '/users',
    },
  ]

  return (
    <div className="bg-sky-900 w-56">
      <h1 className="p-3 w-full text-center text-white font-bold text-2xl">
        Blog Admin
      </h1>
      <nav className="p-2">
        <ul>
          {menuItems.map((item) => {
            return <MenuItem name={item.name} to={item.to} />
          })}
        </ul>
      </nav>
    </div>
  )
}

interface MenuItemProps {
  name: string
  to: string
}

function MenuItem(props: MenuItemProps) {
  const { name, to } = props
  return (
    <li className="p-2 py-3">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `hover:text-white ${
            isActive ? 'text-white font-semibold' : 'text-gray-300'
          } }`
        }
      >
        {name}
      </NavLink>
    </li>
  )
}
