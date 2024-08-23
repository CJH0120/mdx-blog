"use server"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MDX } from "@/interface"

const normalizePath = (str: string): string =>
	str.trim().toLowerCase().replace(/\s+/g, "-")

const parseMarkdownFile = async (
	filePath: string
): Promise<MDX.Metadata | null> => {
	const fileContents = await fs.readFile(filePath, "utf8")
	const { data } = matter(fileContents)

	if (data.path) {
		data.path = normalizePath(data.path as string)
	}

	data.tags =
		typeof data.tag === "string"
			? data.tag.split(",").map((tag) => tag.trim())
			: []

	return {
		title: data.title,
		description: data.description,
		thumbnail: data.thumbnail,
		date: data.date,
		path: data.path,
		tags: data.tags,
	} as MDX.Metadata
}

export const useReadMdx = async (): Promise<MDX.Metadata[]> => {
	const markdownDirectory = path.join(process.cwd(), "_markdown")
	const filenames = await fs.readdir(markdownDirectory)

	const markdownMetaData = await Promise.all(
		filenames.map(async (filename) => {
			const filePath = path.join(markdownDirectory, filename)
			return parseMarkdownFile(filePath)
		})
	)

	return markdownMetaData.filter((data): data is MDX.Metadata => !!data)
}

export const useReadMdxFile = async (
	url_path: string
): Promise<MDX.Props | null> => {
	try {
		const markdownDirectory = path.join(process.cwd(), "_markdown")
		const filenames = await fs.readdir(markdownDirectory)

		const normalizedUrlPath = normalizePath(url_path)

		for (const filename of filenames) {
			const filePath = path.join(markdownDirectory, filename)
			const meta = await parseMarkdownFile(filePath)

			if (meta && meta.path === normalizedUrlPath) {
				const fileContents = await fs.readFile(filePath, "utf8")
				const { content } = matter(fileContents)

				return {
					content,
					meta,
				}
			}
		}

		return null
	} catch (error) {
		console.error("Error reading file:", error)
		return null
	}
}

export const useReadMdxTags = async (
	tags: string[],
	currentFile: string
): Promise<recommend[]> => {
	if (tags.length === 0) return []

	const markdownDirectory = path.join(process.cwd(), "_markdown")
	const filenames = await fs.readdir(markdownDirectory)

	const markdownMetaData = await Promise.all(
		filenames.map(async (filename) => {
			const filePath = path.join(markdownDirectory, filename)
			const meta = await parseMarkdownFile(filePath)
			return meta && tags.some((tag) => meta.tags.includes(tag)) ? meta : null
		})
	)

	const filteredMarkdownMetaData = markdownMetaData.filter(
		(data): data is MDX.Metadata => !!data && data.path !== currentFile
	)

	if (filteredMarkdownMetaData.length === 0) return []

	const sortedMarkdownMetaData = filteredMarkdownMetaData.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)
	return tags.reduce((acc, cur) => {
		const resultSearchData = filteredMarkdownMetaData.filter((data) =>
			data.tags.includes(cur)
		)

		const newResultData = resultSearchData.filter(
			(data) => !acc.some((item) => Object.values(item).flat().includes(data))
		)

		if (newResultData.length > 0) {
			acc.push({ [cur]: newResultData.slice(0, 4) })
		}

		return acc
	}, [] as recommend[])
}

interface recommend {
	[key: string]: MDX.Metadata[]
}
