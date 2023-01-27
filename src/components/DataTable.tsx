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
  const { client, url, EditComponent, title, tableHeadKeyTitle } = props

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

  useEffect(() => {
    async function getItems() {
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

    getItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <span className="flex">
                <button
                  onClick={() => {
                    setPageInfo({
                      ...pageInfo,
                      curPage: 0,
                    })
                  }}
                  className="block px-1 py-2 ml-0 leading-tight text-gray-500 bg-white border border-r-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setPageInfo({
                      ...pageInfo,
                      curPage: Math.max(0, curPage - 1),
                    })
                  }}
                  className="block px-1 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
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
              <span className="flex">
                <button
                  onClick={() => {
                    setPageInfo({
                      ...pageInfo,
                      curPage: Math.min(totalPage - 1, curPage + 1),
                    })
                  }}
                  className="block px-1 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setPageInfo({
                      ...pageInfo,
                      curPage: totalPage - 1,
                    })
                  }}
                  className="block px-1 py-2 leading-tight text-gray-500 bg-white border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                    />
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
