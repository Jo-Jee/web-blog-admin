import Menu from '@components/Menu'
import Header from '@components/Header'

interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Menu />
      <div className="w-full">
        <Header />
        {props.children}
      </div>
    </div>
  )
}

export default Layout
