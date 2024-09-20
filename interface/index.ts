export namespace MDX {
  export interface Props {
    content?: string
    meta: Metadata
  }
  export interface Metadata {
    title: string
    description: string
    thumbnail: string
    date: Date
    series: string
    path: string
    tags: string[]
  }
  export interface DetailProps {
    content: string
    meta: Metadata
    series: Metadata[] | null
    tags: tag[] | null
  }

  export interface tag {
    [key: string]: MDX.Metadata[]
  }
}
