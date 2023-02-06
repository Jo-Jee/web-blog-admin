import EditPost from '@components/EditPost'
import { API } from '@utils/api'
import DataTable from '@components/DataTable'

export default function ManagePosts() {
  return (
    <DataTable
      EditComponent={EditPost}
      client={API.admin}
      url="/posts"
      title="포스트"
      tableHeadKeyTitle={{
        id: { title: 'ID', width: 'w-10' },
        title: { title: 'Title' },
        createdAt: { title: 'Created At', width: 'w-36', type: 'date' },
        updatedAt: { title: 'Updated At', width: 'w-36', type: 'date' },
        publishedAt: { title: 'Published At', width: 'w-48' },
        published: { title: 'Pub', width: 'w-20', type: 'boolean' },
      }}
    />
  )
}
