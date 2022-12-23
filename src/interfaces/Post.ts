export default interface Post {
  id?: number
  title: string
  summary: string
  topicId: number
  tags: string[]
  date: string
  published: boolean
  body: string
}
