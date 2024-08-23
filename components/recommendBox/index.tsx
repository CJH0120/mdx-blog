import { MDX } from "@/interface"
import styles from "./recommend.module.scss"
import Link from "next/link"
import ArticleCard from "../articleCard"
const RecommendBox = ({
	recommendItem,
	keyItem,
}: {
	recommendItem: MDX.Metadata[]
	keyItem: string
}) => {
	return (
		<div className={[styles.recommendBox].join(" ")}>
			<h3 className={styles["recommend-title"]}>
				<span>{keyItem}</span> 관련 연관 콘텐츠
			</h3>
			<ul className={[styles["recommend-list"]].join(" ")}>
				{recommendItem.map((v) => (
					<li key={v.title} className={styles["recommend-item"]}>
						<ArticleCard {...v} isMain={false} />
					</li>
				))}
			</ul>
		</div>
	)
}
export default RecommendBox
