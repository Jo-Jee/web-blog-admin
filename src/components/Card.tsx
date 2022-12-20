interface Props {
  title?: string
  children: React.ReactNode
}

export function Card(props: Props) {
  const { title, children } = props
  return (
    <div className={`bg-white m-2 p-5 rounded shadow flex-grow`}>
      {title && (
        <div className="pb-5 font-bold text-xl text-sky-900">{title}</div>
      )}
      <div>{children}</div>
    </div>
  )
}
