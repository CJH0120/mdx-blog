"use client"

import {
	FC,
	memo,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react"
import styles from "./code.module.scss"
import IconCopy from "@/components/icons/ic-copy"
import hljs from "highlight.js/lib/core"
import Script from "next/script"
import javascript from "highlight.js/lib/languages/javascript"
import css from "highlight.js/lib/languages/css"
import scss from "highlight.js/lib/languages/scss"
import shell from "highlight.js/lib/languages/shell"
import python from "highlight.js/lib/languages/python"
import xml from "highlight.js/lib/languages/xml"
import "./code.scss"
export const Code: FC<PropsWithChildren> = memo(({ children }) => {
	const [isCopy, setIsCopy] = useState<boolean>(false)
	const handleClipboard = useCallback(() => {
		try {
			navigator.clipboard.writeText((children ?? "").toString())
			setIsCopy(true)
		} catch (error) {}
	}, [])
	useEffect(() => {
		if (!isCopy) return
		const timer = setTimeout(() => {
			setIsCopy(false)
		}, 3000)
		return () => {
			clearTimeout(timer)
		}
	}, [isCopy])
	useEffect(() => {
		hljs.registerLanguage("javascript", javascript)
		hljs.registerLanguage("python", python)
		hljs.registerLanguage("shell", shell)
		hljs.registerLanguage("scss", scss)
		hljs.registerLanguage("css", css)
		hljs.registerLanguage("html", xml)
	})

	useEffect(() => {
		hljs.highlightAll()
	}, [])
	return (
		<>
			<div className={[styles["code-wrapper"]].join(" ")}>
				<pre className={styles["code-wrapper"]}>
					<code style={{ padding: "0px" }} className={styles.code}>
						{children}
					</code>
				</pre>

				<div className={styles["button-wrapper"]}>
					{isCopy && <span className={styles["copied"]}>Copied</span>}
					<button onClick={handleClipboard}>
						<IconCopy />
					</button>
				</div>
			</div>
		</>
	)
})

Code.displayName = "Code"
