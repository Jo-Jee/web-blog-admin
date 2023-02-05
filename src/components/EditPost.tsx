import Post from '@interfaces/Post'
import Input from '@components/Input'
import Label from '@components/Label'
import Toggle from '@components/Toggle'
import Select from '@components/Select'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'
import { API } from '@utils/api'
import Topic from '@interfaces/Topic'
import { useNavigate } from 'react-router-dom'

interface EditPostProps {
  item: Post
}

export default function EditPost(props: EditPostProps) {
  const [post, setPost] = useState<Post>()
  const [topics, setTopics] = useState<Topic[]>([])
  const navigate = useNavigate()

  const onSubmit = async () => {
    const method = post?.id ? 'PUT' : 'POST'

    await API.blog(`/posts${post?.id ? `/${post.id}` : ''}`, {
      method: method,
      data: post,
    })

    navigate('/posts/manage')
    window.location.reload()
  }

  useEffect(() => {
    async function getTopics() {
      var topics = await API.blog.get<Topic[]>('/topics')
      setTopics(topics.data)
    }

    getTopics()
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      const id = props.item.id
      let post: Post

      if (id) {
        const res = await API.blog.get<Post>(`/posts/${id}`)
        post = res.data
      } else {
        post = {
          title: '',
          summary: '',
          topicId: 0,
          tags: [],
          published: false,
          body: '',
          createdAt: '',
          updatedAt: '',
        }
      }

      setPost(post)
    }

    fetchPost()
  }, [props])

  if (!post) return <div>Loading..</div>
  else
    return (
      <div className="flex flex-col flex-1">
        <div className="flex">
          <span className="flex-1 m-1">
            <Label>Title</Label>
            <Input
              type="text"
              value={post.title}
              onChange={(e) => {
                setPost({
                  ...post,
                  title: e.target.value,
                })
              }}
              autoFocus
            />
          </span>
        </div>
        <div className="flex">
          <span className="flex-1 m-1">
            <Label>Topic</Label>
            <Select
              value={post.topicId}
              onChange={(e) => {
                setPost({
                  ...post,
                  topicId: +e.target.value,
                })
              }}
            >
              <option value={0} disabled hidden>
                토픽을 선택해주세요
              </option>
              {topics.map((topic) => {
                return (
                  <option value={topic.id} key={topic.id}>
                    {topic.name}
                  </option>
                )
              })}
            </Select>
          </span>
          <span className="flex-1 m-1">
            <Label>Tags</Label>
            <Input
              type="text"
              value={post.tags}
              onChange={(e) => {
                setPost({
                  ...post,
                  tags: e.target.value.split(',').map((tag) => tag.trim()),
                })
              }}
            />
          </span>
          <span className="flex-1 m-1">
            <Label>Published At</Label>
            <Input
              type="text"
              value={post.publishedAt}
              onChange={(e) => {
                setPost({
                  ...post,
                  publishedAt: e.target.value,
                })
              }}
            />
          </span>
          <span className="m-1">
            <Label>Published</Label>
            <Toggle
              checked={post.published}
              onChange={(e) => {
                setPost({
                  ...post,
                  published: e.target.checked,
                })
              }}
            />
          </span>
        </div>
        <div className="flex">
          <span className="flex-1 m-1">
            <Label>Summary</Label>
            <Input
              name="summary"
              type="text"
              value={post.summary}
              onChange={(e) => {
                setPost({
                  ...post,
                  summary: e.target.value,
                })
              }}
            />
          </span>
        </div>
        <div className="mt-3 flex flex-1">
          <div className="flex w-1/2 p-1">
            <textarea
              name="body"
              placeholder="Body"
              value={post.body}
              className="grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              onChange={(e) => {
                setPost({ ...post, body: e.target.value })
              }}
            />
          </div>
          <div className="flex w-1/2 p-1 overflow-hidden">
            <div className="flex flex-1 border shadow rounded overflow-scroll">
              <ReactMarkdown
                className="grow max-w-xl p-3 prose"
                remarkPlugins={[remarkGfm]}
              >
                {post.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-end px-3">
          <button
            className="bg-sky-900 text-white px-3 py-1 rounded"
            onClick={onSubmit}
          >
            확인
          </button>
        </div>
      </div>
    )
}
