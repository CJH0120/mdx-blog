import { notFound } from "next/navigation"
import MDXWrapper from "@/components/MDX/mdxWrapper"
import {
	useReadMdxFile as getFiles,
	useReadMdxTags,
	useReadMdx as getDetail,
} from "@/hooks/useReadMdx"
import { Metadata } from "next"
import RecommendBox from "@/components/recommendBox"
import styles from "./article.module.scss"
import { MDX } from "@/interface"
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
	const data = (await getDetail(params.slug)) as MDX.DetailProps
	if (!data) notFound()
	return (
		<>
			<MDXWrapper content={data.content} meta={data.meta} />
			{!!data.tags?.length && (
				<div className={[styles["recommend-box-wrapper"]].join(" ")}>
					{data.tags?.map((v) =>
						Object.keys(v).map((key) => (
							<RecommendBox key={key} recommendItem={v[key]} keyItem={key} />
						))
					)}
				</div>
			)}
		</>
	)
}
