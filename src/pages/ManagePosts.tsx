import { Card } from '@components/Card'
import EditPost from '@components/EditPost'
import Post from '@interfaces/Post'
import { useEffect, useState } from 'react'
import { API } from 'src/api'

interface PostTableRowProps {
  post: Post
}

export default function ManagePosts() {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState<Array<Post>>([])
  const [selectedPost, setSelectedPost] = useState<Post>()
  const pageSize = 10

  useEffect(() => {
    async function getPosts() {
      const res = await API.blog.get('/posts', {
        params: {
          page: page,
          size: pageSize,
        },
      })

      setPosts(res.data.content)
    }

    getPosts()
  }, [page])

  return (
    <div>
      <Card title="포스트">
        <PostTable />
      </Card>
      {selectedPost && (
        <Card>
          <EditPost post={selectedPost} />
        </Card>
      )}
    </div>
  )

  function PostTable() {
    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-2 text-left w-10">ID</th>
            <th className="px-6 py-2 text-left w-80">Title</th>
            <th className="px-6 py-2 text-left">Create Time</th>
            <th className="px-6 py-2 text-left">Update Time</th>
            <th className="px-6 py-2 text-left w-20">Pub</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostTableRow post={post} key={post.id} />
          ))}
        </tbody>
      </table>
    )
  }

  function PostTableRow(props: PostTableRowProps) {
    const { post } = props
    return (
      <tr
        className="border-b last:border-none hover:bg-sky-100 hover:cursor-pointer"
        onClick={() => {
          setSelectedPost(post)
        }}
      >
        <td className="px-6 py-2">{post.id}</td>
        <td className="px-6 py-2">{post.title}</td>
        <td className="px-6 py-2">{post.createdAt}</td>
        <td className="px-6 py-2">{post.updatedAt}</td>
        <td className="px-6 py-2">{post.published ? '✅' : '❌'}</td>
      </tr>
    )
  }
}
