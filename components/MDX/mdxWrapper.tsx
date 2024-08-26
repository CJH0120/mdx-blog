import styles from "./mdxWrapper.module.scss"
import { MDX } from "@/interface"
import Link from "next/link"
import MDXContent from "./mdxContent"
import Image from "next/image"
import ArticleNav from "./articleNav"
import RecommendBox from "../recommendBox"

const MDXWrapper = ({ content, meta }: MDX.Props) => {
	const articleNav = content
		.split("\n")
		.filter(
			(x) =>
				x.startsWith("##") ||
				x.startsWith("#") ||
				x.startsWith("###") ||
				x.startsWith("####")
		)
		.map((v) => v.replaceAll("#", "").trim())

	return (
		<>
			<article className={styles.container}>
				<header className={styles.header}>
					<div
						style={{
							position: "relative",
							aspectRatio: "16/9",
							borderRadius: "10px",
							overflow: "hidden",
						}}
					>
						<Image
							blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
							placeholder="blur"
							quality={85}
							priority
							style={{
								objectFit: "cover",
							}}
							draggable={false}
							src={`/${meta.thumbnail}`}
							alt={meta.title}
							fill
						/>
					</div>
					<h1 className={styles.title}>{meta.title}</h1>
					{meta.tags && (
						<div className={styles.tags}>
							{meta.tags.map((v) => (
								<span className={styles.tag} key={v}>
									{v}
								</span>
							))}
						</div>
					)}
					<span className={styles.date}>{meta.date}</span>
				</header>
				<MDXContent content={content} meta={meta} />
			</article>
			{/* 
				{articleNav.length > 0 && <ArticleNav articleNav={articleNav} />} */}
		</>
	)
}

export default MDXWrapper
