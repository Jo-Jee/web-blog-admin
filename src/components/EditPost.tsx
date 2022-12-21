import Post from '@interfaces/Post'
import Input from '@components/Input'
import Label from '@components/Label'
import Toggle from '@components/Toggle'
import Select from '@components/Select'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'

interface EditPostProps {
  post: Post
}

export default function EditPost(props: EditPostProps) {
  const [post, setPost] = useState<Post>(props.post)

  return (
    <div className="flex flex-col flex-1">
      <div className="flex">
        <span className="flex-1 m-1">
          <Label>Title</Label>
          <Input
            type="text"
            value={post.frontMatter.title}
            onChange={(e) => {
              setPost({
                ...post,
                frontMatter: { ...post.frontMatter, title: e.target.value },
              })
            }}
            autoFocus
          />
        </span>
      </div>
      <div className="flex">
        <span className="flex-1 m-1">
          <Label>Topic</Label>
          <Select></Select>
        </span>
        <span className="flex-1 m-1">
          <Label>Tags</Label>
          <Input
            type="text"
            onChange={(e) => {
              setPost({
                ...post,
                frontMatter: {
                  ...post.frontMatter,
                  tags: e.target.value.split(',').map((tag) => tag.trim()),
                },
              })
              console.log(post)
            }}
          />
        </span>
        <span className="m-1">
          <Label>Published</Label>
          <Toggle
            checked={post.frontMatter.published}
            onChange={(e) => {
              setPost({
                ...post,
                frontMatter: {
                  ...post.frontMatter,
                  published: e.target.checked,
                },
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
            onChange={(e) => {
              setPost({
                ...post,
                frontMatter: { ...post.frontMatter, summary: e.target.value },
              })
            }}
          />
        </span>
      </div>
      <div className="mt-3 flex flex-1">
        <span className="flex w-1/2 p-1">
          <textarea
            name="body"
            placeholder="Body"
            value={post.body}
            className="grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            onChange={(e) => {
              setPost({ ...post, body: e.target.value })
            }}
          />
        </span>
        <span className="flex w-1/2 p-1">
          <ReactMarkdown
            className="grow max-w-4xl overflow-hidden border shadow rounded px-3 prose"
            remarkPlugins={[remarkGfm]}
          >
            {post.body}
          </ReactMarkdown>
        </span>
      </div>
      <div className="mt-3 flex justify-end px-3">
        <button className="bg-sky-900 text-white px-3 py-1 rounded">
          확인
        </button>
      </div>
    </div>
  )
}
