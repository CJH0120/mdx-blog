"use client"
import { MDX } from "@/interface"
import Link from "next/link"
import styles from "./articleCard.module.scss"
import Image from "next/image"
import { memo, useCallback, useEffect, useRef } from "react"
const ArticleCard = memo(
	({
		date,
		description,
		path,
		thumbnail,
		title,
		isMain = true,
	}: Omit<MDX.Metadata, "tags"> & { isMain?: boolean }) => {
		const ref = useRef<HTMLAnchorElement>(null)

		const handleIntoView = useCallback(() => {
			if (!ref.current) return
			ref.current.classList.add(styles["card-into-view"])
		}, [])

		useEffect(() => {
			if (!ref.current || !isMain) return

			const options = {
				root: null,
				rootMargin: "1px",
				threshold: 1.0,
			}

			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					handleIntoView()
				}
			}, options)

			if (ref.current) {
				observer.observe(ref.current)
			}

			return () => {
				if (ref.current) {
					// eslint-disable-next-line react-hooks/exhaustive-deps
					observer.unobserve(ref.current)
				}
			}
		}, [title, handleIntoView, isMain])
		return (
			<Link
				className={[
					styles["card-wrapper"],
					!isMain ? styles["card-not-intersect"] : "",
				].join(" ")}
				href={`/article/${path}`}
				ref={ref}
			>
				<div className={styles["card-content"]}>
					<h3 className={styles["card-title"]}>{title}</h3>
					{isMain && (
						<span className={styles["card-description"]}>{description}</span>
					)}
					<span className={styles["card-date"]}>{date}</span>
				</div>

				<div className={styles["card-thumbnail"]}>
					<Image
						src={`/${thumbnail}`}
						alt={title}
						fill
						quality={100}
						priority
						sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw"
						blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
						placeholder="blur"
					/>
				</div>
			</Link>
		)
	}
)

export default ArticleCard

ArticleCard.displayName = "ArticleCard"
