"use server"
import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"
import { MDX } from "@/interface"

const normalizePath = (str: string): string =>
	str.trim().toLowerCase().replace(/\s+/g, "-")

const parseMarkdownFile = async (filePath: string): Promise<MDX.Metadata> => {
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
		series: data.series,
		tags: data.tags,
	} as MDX.Metadata
}

export const useReadMdx = async (
	pathUrl?: string,
	tag?: string
): Promise<MDX.Metadata[] | MDX.DetailProps> => {
	const markdownDirectory = path.join(process.cwd(), "_markdown")
	const filenames = await fs.readdir(markdownDirectory)

	let current_content = undefined
	let current_tag: string[] = []
	let current_series: string | undefined = undefined

	const markdownMetaData: MDX.Metadata[] = await Promise.all(
		filenames.map(async (filename) => {
			const filePath = path.join(markdownDirectory, filename)
			const meta = await parseMarkdownFile(filePath)
			if (!!pathUrl && normalizePath(pathUrl) === meta.path) {
				const fileContents = await fs.readFile(filePath, "utf8")
				const { content, data } = matter(fileContents)
				current_content = content
				current_tag = data.tags
				current_series = data.series
			}
			return { ...meta }
		})
	).then((data) =>
		data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	)

	if (pathUrl && typeof current_content === "string") {
		const currentMetaIdx = markdownMetaData.findIndex(
			(data) => data.path === normalizePath(pathUrl)
		) as number

		return {
			content: current_content,
			meta: markdownMetaData[currentMetaIdx],
			series: !!current_series
				? markdownMetaData.filter(
						(data) => data.series === (current_series as string)
				  )
				: null,
			tags: !!current_tag.length
				? current_tag.reduce((acc, cur: string) => {
						const resultSearchData = markdownMetaData.filter((data) =>
							data.tags.includes(cur)
						)

						const newResultData = resultSearchData.filter(
							(data) =>
								!acc.some((item) => Object.values(item).flat().includes(data))
						)
						if (newResultData.length > 0) {
							acc.push({ [cur]: newResultData.slice(0, 4) })
						}
						return acc
				  }, [] as recommend[])
				: null,
		}
	} else {
		return markdownMetaData
	}
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

// export const useReadMdxSeries = async (series: string) => {
// 	if (!series) return []
// 	const markdownDirectory = path.join(process.cwd(), "_markdown")
// 	const filenames = await fs.readdir(markdownDirectory)
// 	const seriesData = await Promise.all(
// 		filenames.map(async (filename) => {
// 			const filePath = path.join(markdownDirectory, filename)
// 			const meta = await parseMarkdownFile(filePath)
// 			return meta && meta.series === series ? meta : null
// 		})
// 	)
// 	const currentFile = seriesData.find((data) => data?.date === )
// 	console.log(currentFile)
// 	console.log("*********currentFile******")
// 	if (!currentFile) return []

// 	let before: MDX.Metadata[] = []
// 	let after: MDX.Metadata[] = []
// 	const filteredSeriesData = seriesData
// 		.filter(
// 			(data): data is MDX.Metadata => !!data && data.path !== currentFile.path
// 		)
// 		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// 	for (const file of filteredSeriesData) {
// 		if (new Date(file.date) < new Date(currentFile.date)) {
// 			before.push(file)
// 		} else {
// 			after.push(file)
// 		}
// 	}
// 	const result: MDX.Metadata[] = []

// 	if (before.length) {
// 		result.push(before[before.length - 1])
// 	}

// 	result.push(...after.slice(0, 4))

// 	return result

// 	// return filteredSeriesData.reduce((acc: MDX.Metadata[], cur) => {
// 	// 	new Date(cur.date) < new Date(currentFileDate)
// 	// 		? before.push(cur)
// 	// 		: after.push(cur)

// 	// 	if (!!before.length) {
// 	// 		acc.push(before[before.length - 1])
// 	// 	}

// 	// 	if (!!after.length) {
// 	// 		after.slice(0, 4).forEach((data) => acc.push(data))
// 	// 	}
// 	// 	return acc
// 	// }, [])
// }
