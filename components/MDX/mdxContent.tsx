import { MDX } from "@/interface"
import { MDXRemote } from "next-mdx-remote/rsc"
import CustomTag from "../SemanticTag"
import styles from "./content.module.scss"

const MDXContent = ({ content, meta }: MDX.Props) => {
	console.log(content)
	return (
		<>
			<div className={styles.markdown}>
				<MDXRemote source={content} components={CustomTag} />
			</div>
		</>
	)
}
export default MDXContent
