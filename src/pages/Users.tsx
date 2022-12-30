import DataTable from '@components/DataTable'
import User from '@interfaces/User'
import { API } from '@utils/api'

export default function Users() {
  return (
    <DataTable
      EditComponent={Temp}
      client={API.user}
      title="사용자"
      tableHeadKeyTitle={{
        id: { title: 'ID', width: 'w-10' },
        email: { title: 'Email' },
      }}
      url="/"
    />
  )
}

function Temp(props: { item: User }) {
  return <div>{props.item.id}</div>
}
