import { Card } from '@components/Card'
import EditPost from '@components/EditPost'

export default function NewPost() {
  const newPost = {
    frontMatter: {
      title: '',
      summary: '',
      topic: '',
      tags: [],
      date: '',
      published: false,
    },
    body: '',
  }

  return (
    <Card stretch title="신규 포스트">
      <EditPost post={newPost} />
    </Card>
  )
}
