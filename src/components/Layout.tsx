import Menu from '@components/Menu'
import Header from '@components/Header'

interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  return (
    <div className="flex h-screen w-screen">
      <Menu />
      <div className="grow flex flex-col">
        <Header />
        <div className="bg-gray-100 grow h-full overflow-scroll">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
