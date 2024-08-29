"use client"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-javascript"

import { FC, memo, PropsWithChildren, useEffect } from "react"
import styles from "./code.module.scss"

export const Code: FC<PropsWithChildren & { className?: string }> = memo(
	({ children, className }) => {
		const language = className ?? "".replace(/language-/, "")

		useEffect(() => {
			Prism.highlightAll()
		}, [])
		return !!language ? (
			<div className={styles["code-wrapper"]}>
				<pre className={[styles["code-pre"], language].join(" ")}>
					<code className={styles.code}>{children}</code>
				</pre>
				{/* <div className={styles["button-wrapper"]}>
					{isCopy && <span className={styles["copied"]}>Copied</span>}
					<button onClick={handleClipboard}>
						<IconCopy />
					</button>
				</div> */}
			</div>
		) : (
			<code className={styles["only-code"]}>{children}</code>
		)
	}
)

Code.displayName = "Code"
