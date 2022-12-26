import { Card } from '@components/Card'
import EditPost from '@components/EditPost'
import Post from '@interfaces/Post'
import { useEffect, useState } from 'react'
import { API } from 'src/api'

interface PostTableRowProps {
  post: Post
}

interface pageInfoState {
  curPage: number
  totalPage: number
  pageSize: number
  pageNavIndex: number[]
  posts: Post[]
  selectedPost?: Post
}

export default function ManagePosts() {
  const [pageInfo, setPageInfo] = useState<pageInfoState>({
    curPage: 0,
    totalPage: 0,
    pageSize: 10,
    pageNavIndex: [],
    posts: [],
    selectedPost: undefined,
  })
  const { curPage, totalPage, pageSize, pageNavIndex, posts, selectedPost } =
    pageInfo

  useEffect(() => {
    async function getPosts() {
      let navPagesIndexes: number[] = []
      let basePage = curPage - 2

      const res = await API.blog.get('/posts', {
        params: {
          page: curPage,
          size: pageSize,
        },
      })

      while (navPagesIndexes.length < 5) {
        if (basePage === res.data.totalPages) break
        if (basePage > -1) navPagesIndexes.push(basePage)
        basePage++
      }

      setPageInfo({
        ...pageInfo,
        posts: res.data.content,
        totalPage: res.data.totalPages,
        pageNavIndex: navPagesIndexes,
      })
    }

    getPosts()
  }, [pageInfo.curPage])

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
      <div className="w-full">
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
        <div className="flex justify-center">
          <nav>
            <div className="inline-flex items-center -space-x-px">
              <span>
                <button
                  onClick={() => {
                    setPageInfo({
                      ...pageInfo,
                      curPage: Math.max(0, curPage - 1),
                    })
                  }}
                  className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
                  </svg>
                </button>
              </span>
              {pageNavIndex.map((index) => (
                <span key={index}>
                  <button
                    onClick={() => {
                      setPageInfo({
                        ...pageInfo,
                        curPage: index,
                      })
                    }}
                    className={`px-3 py-2 leading-tight ${
                      index === curPage
                        ? 'relative z-10 text-sky-600 bg-sky-50 border-sky-500 hover:text-sky-700 hover:bg-sky-100'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    } border `}
                  >
                    {index + 1}
                  </button>
                </span>
              ))}
              <span>
                <button
                  onClick={() => {
                    setPageInfo({
                      ...pageInfo,
                      curPage: Math.min(totalPage - 1, curPage + 1),
                    })
                  }}
                  className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                  </svg>
                </button>
              </span>
            </div>
          </nav>
        </div>
      </div>
    )
  }

  function PostTableRow(props: PostTableRowProps) {
    const { post } = props
    return (
      <tr
        className="border-b last:border-none hover:bg-sky-100 hover:cursor-pointer"
        onClick={() => {
          setPageInfo({ ...pageInfo, selectedPost: post })
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
