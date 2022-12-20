import { Card } from '@components/Card'
import Post from '@interfaces/Post'
import { useEffect } from 'react'

export default function Posts() {
  const posts = [
    {
      id: 1,
      frontMatter: {
        title: 'title',
        summary: 'summary',
        topic: 'topic',
        tags: ['tag1', 'tag2'],
        date: 'date',
        published: true,
      },
      body: 'body',
    },
    {
      id: 2,
      frontMatter: {
        title: 'title2',
        summary: 'summary2',
        topic: 'topic2',
        tags: ['tag12', 'tag22'],
        date: 'date2',
        published: true,
      },
      body: 'body2',
    },
    {
      id: 3,
      frontMatter: {
        title: 'title3',
        summary: 'summary3',
        topic: 'topic3',
        tags: ['tag13', 'tag23'],
        date: 'date3',
        published: true,
      },
      body: 'body3',
    },
  ]

  useEffect(() => {})

  return (
    <div>
      <Card title="포스트">
        <PostTable posts={posts} />
      </Card>
    </div>
  )
}

interface PostTableProps {
  posts: Post[]
}
function PostTable(props: PostTableProps) {
  const { posts } = props
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b">
          <th className="px-6 py-4 text-left">ID</th>
          <th className="px-6 py-4 text-left">Title</th>
          <th className="px-6 py-4 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <PostTableRow post={post} />
        ))}
      </tbody>
    </table>
  )
}

interface PostTableRowProps {
  post: Post
}

function PostTableRow(props: PostTableRowProps) {
  const { post } = props
  return (
    <tr className="border-b last:border-none">
      <td className="px-6 py-4">{post.id}</td>
      <td className="px-6 py-4">{post.frontMatter.title}</td>
      <td className="px-6 py-4">{post.frontMatter.date}</td>
    </tr>
  )
}
