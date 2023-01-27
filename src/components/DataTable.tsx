import { Card } from '@components/Card'
import { ReactNode, useEffect, useState } from 'react'
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
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z"
                      clipRule="evenodd"
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
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
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
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
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
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
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
          let content: ReactNode
          switch (tableHeadKeyTitle[key].type) {
            case 'boolean':
              content = item[key] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 fill-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 fill-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )
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
