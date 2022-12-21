export default interface Post {
  id?: number
  title: string
  summary: string
  topic: string
  tags: string[]
  date: string
  published: boolean
  body: string
}
