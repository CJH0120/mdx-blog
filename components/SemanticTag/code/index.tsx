"use client"

import {
	FC,
	memo,
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import styles from "./code.module.scss"
import IconCopy from "@/components/icons/ic-copy"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import scss from "highlight.js/lib/languages/scss"

import "./code.scss"
export const Code: FC<PropsWithChildren> = memo(({ children }) => {
	const [isCopy, setIsCopy] = useState<boolean>(false)
	const handleClipboard = useCallback(() => {
		try {
			navigator.clipboard.writeText((children ?? "").toString())
			setIsCopy(true)
		} catch (error) {}
	}, [children])
	useEffect(() => {
		if (!isCopy) return
		const timer = setTimeout(() => {
			setIsCopy(false)
		}, 2300)
		return () => {
			clearTimeout(timer)
		}
	}, [isCopy])
	const codeEl = useRef<HTMLPreElement>(null)
	useEffect(() => {
		hljs.registerLanguage("typescript", typescript)
		hljs.registerLanguage("scss", scss)
		if (codeEl.current) {
			const codeBlock = codeEl.current
			hljs.registerLanguage("typescript", typescript)
			hljs.registerLanguage("scss", scss)
			hljs.highlightElement(codeBlock)
		}
	}, [children])

	return (
		<div className={styles["code-wrapper"]}>
			<pre ref={codeEl} className={[styles["code-pre"]].join(" ")}>
				<code className={styles.code}>{children}</code>
			</pre>
			<div className={styles["button-wrapper"]}>
				{isCopy && <span className={styles["copied"]}>Copied</span>}
				<button onClick={handleClipboard}>
					<IconCopy />
				</button>
			</div>
		</div>
	)
})

Code.displayName = "Code"
