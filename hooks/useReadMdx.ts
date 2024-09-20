'use server'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDX } from '@/interface'

const normalizePath = (str: string): string => str.trim().toLowerCase().replace(/\s+/g, '-')

const parseMarkdownFile = async (filePath: string): Promise<MDX.Metadata> => {
  const fileContents = await fs.readFile(filePath, 'utf8')
  const { data } = matter(fileContents)

  if (data.path) {
    data.path = normalizePath(data.path as string)
  }

  data.tags = typeof data.tag === 'string' ? data.tag.split(',').map((tag) => tag.trim()) : []

  return {
    title: data.title,
    description: data.description,
    thumbnail: data.thumbnail,
    date: new Date(data.date),
    path: data.path,
    series: data.series,
    tags: data.tags,
  } as MDX.Metadata
}

export const useReadMdx = async (pathUrl?: string, i18n?: string): Promise<MDX.Metadata[] | MDX.DetailProps> => {
  const markdownDirectory = path.join(process.cwd(), `_markdown/${i18n === 'en' ? 'en' : 'ko'}`)
  const filenames = await fs.readdir(markdownDirectory)

  let current_content = undefined
  let current_tag: string[] = []
  let current_series: string | undefined = undefined

  const markdownMetaData: MDX.Metadata[] = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(markdownDirectory, filename)
      const meta = await parseMarkdownFile(filePath)
      if (!!pathUrl && normalizePath(pathUrl) === meta.path) {
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { content, data } = matter(fileContents)
        current_content = content
        current_tag = data.tags
        current_series = data.series
      }
      return { ...meta }
    })
  ).then((data) => data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))

  if (pathUrl && typeof current_content === 'string') {
    const currentMetaIdx = markdownMetaData.findIndex((data) => data.path === normalizePath(pathUrl)) as number

    let tagsArray = []
    for (const tag of current_tag) {
      const resultSearchData = markdownMetaData.filter((data) => data.path !== normalizePath(pathUrl) && data.tags.includes(tag))
      resultSearchData.length && tagsArray.push({ [tag]: resultSearchData })
    }

    return {
      content: current_content,
      meta: markdownMetaData[currentMetaIdx],
      series: !!current_series ? markdownMetaData.filter((data) => data.series === (current_series as string)).reverse() : null,
      tags: !!current_tag.length ? tagsArray : null,
    }
  } else {
    return markdownMetaData
  }
}

export const useReadMdxFile = async (url_path: string, i18n?: string): Promise<MDX.Props | null> => {
  try {
    const markdownDirectory = path.join(process.cwd(), `_markdown/${i18n === 'en' ? 'en' : 'ko'}`)
    const filenames = await fs.readdir(markdownDirectory)
    const normalizedUrlPath = normalizePath(url_path)

    for (const filename of filenames) {
      const filePath = path.join(markdownDirectory, filename)
      const meta = await parseMarkdownFile(filePath)

      if (meta && meta.path === normalizedUrlPath) {
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { content } = matter(fileContents)

        return {
          content,
          meta,
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
}
