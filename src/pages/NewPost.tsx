import { Card } from '@components/Card'
import EditPost from '@components/EditPost'
import Post from '@interfaces/Post'
import moment from 'moment'

export default function NewPost() {
  const newPost: Post = {
    title: '',
    summary: '',
    topicId: 0,
    tags: [],
    published: false,
    publishedAt: moment().format('yyyy-MM-DDTHH:00:00'),
    body: '',
  }

  return (
    <Card stretch title="신규 포스트">
      <EditPost item={newPost} />
    </Card>
  )
}
