interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select(props: SelectProps) {
  return (
    <select
      className="border border-gray-300 shadow text-gray-900 text-sm rounded block w-full p-2.5 focus:outline-none"
      {...props}
    >
      {props.children}
    </select>
  )
}
