import { NavLink } from 'react-router-dom'

interface MenuInfo {
  name: string
  to: string
}

interface MenuGroupInfo {
  name: string
  menuItems: MenuInfo[]
}

export default function Menu() {
  const menuGroups: Array<MenuGroupInfo> = [
    {
      name: '블로그',
      menuItems: [
        {
          name: '포스트 관리',
          to: '/posts/manage',
        },
        {
          name: '신규 포스트',
          to: '/posts/new',
        },
        {
          name: '토픽 관리',
          to: '/topics',
        },
      ],
    },
    {
      name: '사용자',
      menuItems: [
        {
          name: '사용자 관리',
          to: '/users',
        },
      ],
    },
  ]

  return (
    <div className="bg-sky-900 w-56 grow-0 shrink-0">
      <h1 className="p-3 w-full text-center text-white font-bold text-2xl">
        Blog Admin
      </h1>
      <nav className="p-2">
        <ul>
          {menuGroups.map((group) => {
            return <MenuItemGroup group={group} key={group.name} />
          })}
        </ul>
      </nav>
    </div>
  )
}

interface MenuItemProps {
  item: MenuInfo
}

function MenuItem(props: MenuItemProps) {
  const { name, to } = props.item
  return (
    <li className="px-2 py-1">
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

interface MenuGroupProps {
  group: MenuGroupInfo
}

function MenuItemGroup(props: MenuGroupProps) {
  const { name, menuItems } = props.group
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-gray-100 text-sm my-2">{name}</span>
        <span className="arrow down"></span>
      </div>
      <ul>
        {menuItems.map((item) => {
          return <MenuItem item={item} key={item.name} />
        })}
      </ul>
    </div>
  )
}
