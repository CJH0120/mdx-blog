import { useReadMdx as MDXRead } from "@/hooks/useReadMdx"

export async function generateStaticParams() {
	const posts = await MDXRead()
	return posts.map((post) => ({
		slug: post.path,
	}))
}
export default function ArticleLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}
