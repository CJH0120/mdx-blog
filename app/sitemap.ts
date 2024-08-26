import type { MetadataRoute } from "next"
import { useReadMdx as ReadMDX } from "../hooks/useReadMdx"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://hyune.vercel.app"

	const posts = await ReadMDX()
	const indexPage = {
		url: baseUrl,
		lastModified: new Date(),
	}
	const article = posts.map((post) => {
		return {
			url: `${baseUrl}/article/${post.path}`,
			lastModified: post.date,
		}
	})

	return [indexPage, ...article]
}
