export default function Menu() {
  const menuItems = [
    {
      name: '신규 포스트',
      href: '/posts',
    },
    {
      name: '포스트 관리',
      href: '/posts',
    },
  ]

  return (
    <div className="bg-sky-800 w-56">
      <h1 className="p-3 w-full text-center text-white font-bold text-2xl">
        Blog Admin
      </h1>
      <div className="p-4">
        {menuItems.map((item) => {
          return <MenuItem name={item.name} href={item.href} />
        })}
      </div>
    </div>
  )
}

interface MenuItemProps {
  name: string
  href: string
}

function MenuItem(props: MenuItemProps) {
  const { name, href } = props
  return (
    <div className="text-white">
      <a href={href}>{name}</a>
    </div>
  )
}
