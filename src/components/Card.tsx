interface Props {
  title?: string
  stretch?: boolean
  children: React.ReactNode
}

export function Card(props: Props) {
  const { title, children, stretch } = props
  return (
    <div className={`flex flex-col flex-grow ${stretch ? 'h-full' : ''} p-2`}>
      <div className={`bg-white p-5 rounded drop-shadow flex flex-col flex-1`}>
        {title && (
          <div className="pb-5 font-bold text-xl text-sky-900">{title}</div>
        )}
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  )
}
