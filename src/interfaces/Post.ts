import FrontMatter from '@interfaces/FrontMatter'

export default interface Post {
  id?: number
  frontMatter: FrontMatter
  body: string
}
