import type { MetadataRoute } from "next"
import { useReadMdx as ReadMDX } from "../hooks/useReadMdx"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://bittenlog.vercel.app"

	const posts = await ReadMDX()
	const indexPage = {
		url: baseUrl,
		lastModified: new Date().toISOString().split("T")[0],
	}
	const article = posts.map((post) => {
		return {
			url: `${baseUrl}/article/${post.path}`,
			lastModified: new Date(post.date).toISOString().split("T")[0],
		}
	})

	return [indexPage, ...article]
}
