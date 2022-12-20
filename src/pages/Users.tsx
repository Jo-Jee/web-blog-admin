import { Card } from '@components/Card'
import { useEffect } from 'react'

interface User {
  id: number
  email: string
}

export default function Users() {
  const users = [
    { id: 1, email: 'test@good.com' },
    { id: 2, email: 'test2@good.com' },
    { id: 3, email: 'test3@good.com' },
  ]

  useEffect(() => {})

  return (
    <div>
      <Card title="사용자">
        <UserTable users={users} />
      </Card>
    </div>
  )
}

interface UserTableProps {
  users: User[]
}
function UserTable(props: UserTableProps) {
  const { users } = props
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b">
          <th className="px-6 py-4 text-left">uid</th>
          <th className="px-6 py-4 text-left">email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserTableRow user={user} />
        ))}
      </tbody>
    </table>
  )
}

interface UserTableRowProps {
  user: User
}

function UserTableRow(props: UserTableRowProps) {
  const { user } = props
  return (
    <tr className="border-b last:border-none">
      <td className="px-6 py-4">{user.id}</td>
      <td className="px-6 py-4">{user.email}</td>
    </tr>
  )
}
