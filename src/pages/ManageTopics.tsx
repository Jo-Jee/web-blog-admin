import { API } from '@utils/api'
import Topic from '@interfaces/Topic'
import { useEffect, useState } from 'react'
import Input from '@components/Input'
import { Card } from '@components/Card'

export default function ManageTopics() {
  const [topics, setTopics] = useState<Topic[]>([])

  const fetchTopics = async () => {
    const res = await API.blog.get<Topic[]>('/topics')

    setTopics(res.data)
  }
  useEffect(() => {
    fetchTopics()
  }, [])

  const addTopic = () => {
    setTopics([...topics, { name: '' }])
  }

  return (
    <Card>
      <div className="w-full">
        <table className="table-fixed w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-2 text-left w-10">ID</th>
              <th className="px-6 py-2 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {topics?.map((topic, i) => (
              <TableRow key={i} topic={topic} />
            ))}
            <tr>
              <td colSpan={2}>
                <div className="pt-3 px-3">
                  <button
                    onClick={addTopic}
                    className="m-1 bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded w-full"
                  >
                    추가
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  )

  function TableRow(props: { topic: Topic }) {
    const { topic } = props
    const [topicName, setTopicName] = useState(topic.name)
    const [isEdit, setIsEdit] = useState(topic.id ? false : true)

    const submitClick = async () => {
      try {
        const method = topic.id ? 'PUT' : 'POST'
        const res = await API.blog<Topic>(
          `/topics${topic.id ? `/${topic.id}` : ''}`,
          {
            method: method,
            data: { name: topicName },
          }
        )

        setTopics(topics.map((item) => (item == topic ? res.data : item)))
        setIsEdit(false)
      } catch (e) {
        alert('에러')
      }
    }

    return (
      <tr className="border-b last:border-none hover:bg-sky-100 hover:cursor-pointer">
        <td className="px-6 py-2">{topic.id}</td>
        <td className="px-6 py-2 h-14">
          {isEdit ? (
            <div className="flex">
              <Input
                value={topicName}
                onChange={(e) => {
                  setTopicName(e.target.value)
                }}
                autoFocus
              ></Input>
              <div className="w-full">
                <button
                  onClick={() => {
                    submitClick()
                  }}
                  className="m-1 bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded"
                >
                  확인
                </button>
                <button
                  onClick={() => {
                    if (topic.id) {
                      setIsEdit(false)
                      setTopicName(topic.name)
                    } else setTopics(topics.filter((item) => item !== topic))
                  }}
                  className="m-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setIsEdit(true)
              }}
            >
              {topicName}
            </div>
          )}
        </td>
      </tr>
    )
  }
}
