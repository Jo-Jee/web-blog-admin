import Menu from '@components/Menu'
import Header from '@components/Header'

interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  return (
    <div className="flex h-screen w-screen">
      <Menu />
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="bg-gray-100 h-full overflow-auto">{props.children}</div>
      </div>
    </div>
  )
}

export default Layout
