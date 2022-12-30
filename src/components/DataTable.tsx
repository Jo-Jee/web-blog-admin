import { Card } from '@components/Card'
import { useEffect, useState } from 'react'
import { AxiosInstance } from 'axios'
import { format, register } from 'timeago.js'
import ko from 'timeago.js/lib/lang/ko'

register('ko', ko)

interface Props {
  client: AxiosInstance
  url: string
  EditComponent: (props: { item: any }) => JSX.Element
  title: string
  tableHeadKeyTitle: {
    [key: string]: { title: string; width?: string; type?: string }
  }
}

interface PageInfoState {
  curPage: number
  totalPage: number
  pageSize: number
  pageNavIndex: number[]
  items: any[]
  selectedItem?: any
}

export default function DataTable(props: Props) {
  const [pageInfo, setPageInfo] = useState<PageInfoState>({
    curPage: 0,
    totalPage: 0,
    pageSize: 10,
    pageNavIndex: [],
    items: [],
    selectedItem: undefined,
  })
  const { curPage, totalPage, pageSize, pageNavIndex, items, selectedItem } =
    pageInfo

  const { client, url, EditComponent, title, tableHeadKeyTitle } = props

  useEffect(() => {
    async function getPosts() {
      let navPagesIndexes: number[] = []
      let basePage = curPage - 2

      const res = await client.get(url, {
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
        items: res.data.content,
        totalPage: res.data.totalPages,
        pageNavIndex: navPagesIndexes,
      })
    }

    getPosts()
  }, [pageInfo.curPage])

  return (
    <div>
      <Card title={title}>
        <Table />
      </Card>
      {selectedItem && (
        <Card>
          <EditComponent item={selectedItem} />
        </Card>
      )}
    </div>
  )

  function Table() {
    return (
      <div className="w-full">
        <div className="h-[500px]">
          <table className="table-fixed w-full">
            <thead>
              <tr className="border-b">
                {Object.keys(tableHeadKeyTitle).map((key) => (
                  <th
                    className={`px-6 py-2 text-left ${tableHeadKeyTitle[key].width}`}
                    key={key}
                  >
                    {tableHeadKeyTitle[key].title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <TableRow item={item} key={item.id} />
              ))}
            </tbody>
          </table>
        </div>
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

  function TableRow(props: { item: any }) {
    const { item } = props

    return (
      <tr
        className="border-b last:border-none hover:bg-sky-100 hover:cursor-pointer"
        onClick={() => {
          setPageInfo({ ...pageInfo, selectedItem: item })
        }}
      >
        {Object.keys(tableHeadKeyTitle).map((key) => {
          let content: string
          switch (tableHeadKeyTitle[key].type) {
            case 'boolean':
              content = item[key] ? '✅' : '❌'
              break
            case 'date':
              content = format(item[key], 'ko')
              break
            default:
              content = item[key].toString()
              break
          }
          return (
            <td
              className="whitespace-nowrap text-ellipsis h-10 overflow-hidden px-6 py-2"
              key={key}
            >
              {content}
            </td>
          )
        })}
      </tr>
    )
  }
}
