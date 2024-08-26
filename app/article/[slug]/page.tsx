import { notFound } from "next/navigation"
import MDXWrapper from "@/components/MDX/mdxWrapper"
import { useReadMdxFile as getFiles, useReadMdxTags } from "@/hooks/useReadMdx"
import { Metadata } from "next"
import RecommendBox from "@/components/recommendBox"
import styles from "./article.module.scss"
export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const data = await getFiles(params.slug)
	if (!data) return {}
	return {
		title: data.meta.title,
		description: data.meta.description,
		openGraph: {
			images: data.meta.thumbnail,
		},
		keywords: [...data.meta.tags],
	}
}

export default async function Page({ params }: { params: { slug: string } }) {
	const data = await getFiles(params.slug)
	if (!data) notFound()
	const RecommendData = await useReadMdxTags(data.meta.tags ?? [], params.slug)
	return (
		<>
			<MDXWrapper content={data.content} meta={data.meta} />
			{!!RecommendData.length && (
				<div className={[styles["recommend-box-wrapper"]].join(" ")}>
					{RecommendData.map((v) =>
						Object.keys(v).map((key) => (
							<RecommendBox key={key} recommendItem={v[key]} keyItem={key} />
						))
					)}
				</div>
			)}
		</>
	)
}
