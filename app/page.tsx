import Image from "next/image"
import styles from "./page.module.scss"
import { useReadMdx } from "@/hooks/useReadMdx"
import ArticleCard from "@/components/articleCard"

export default async function Home() {
	const markdownFiles = await useReadMdx()
	console.log(markdownFiles)
	return (
		<ul className={styles.main}>
			{markdownFiles.map((v) => {
				return (
					<li key={v.path}>
						<ArticleCard {...v} />
					</li>
				)
			})}
		</ul>
	)
}
