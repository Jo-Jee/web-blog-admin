import { Card } from '@components/Card'
import EditPost from '@components/EditPost'

export default function NewPost() {
  const newPost = {
    title: '',
    summary: '',
    topicId: 0,
    tags: [],
    published: false,
    body: '',
  }

  return (
    <Card stretch title="신규 포스트">
      <EditPost post={newPost} />
    </Card>
  )
}
