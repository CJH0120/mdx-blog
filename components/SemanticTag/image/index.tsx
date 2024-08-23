import Image from "next/image"
import { FC, memo } from "react"
import fs from "fs"
import path from "path"
import sizeOf from "image-size"
// export const Images: FC<{ src?: string; alt?: string }> = memo(
// return <></>
// 	({ src, alt }) => {
// 		if (!src) return null
// 		const isLocalImage = !src.startsWith("http")
// 		let newSrc: string = ""
// 		if (isLocalImage && !src.startsWith("/")) {
// 			newSrc = `/${src}`
// 		} else {
// 			newSrc = src
// 		}

// 		const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

// 		if (!isLocalImage && src.startsWith(basePath)) {
// 			newSrc = src
// 		}
// 		if (isLocalImage && basePath) {
// 			newSrc = `${basePath}${newSrc}`
// 			const fileName = src.replace("/images", "") // e.g. file.png, or /subdir/file.png
// 			const filePath = path.join(process.cwd(), "public", "images", fileName)
// 			const dimensions = getImageSize(filePath)
// 		}

// 		return (
// 			<span
// 				style={{
// 					width: "100%",
// 					maxWidth: `${width ?? 666}px`,
// 					display: "block",
// 					aspectRatio: ` ${width ?? 16} / ${height ?? 9}} `,
// 					position: "relative",
// 				}}
// 			>
// 				<Image
// 					style={{
// 						zIndex: 11,
// 					}}
// 					draggable={false}
// 					alt={alt ?? "the image"}
// 					src={newSrc}
// 					fill
// 					sizes="(max-width: 666px) 100vw, 666px"
// 					blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
// 					placeholder="blur"
// 					loading="lazy"
// 					quality={100}
// 				/>
// 			</span>
// 		)
// 	}
// )

// export default Images
// Images.displayName = "Images"

// const getImageSize = (filePath: string): { width: number; height: number } => {
// 	console.log(filePath)
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@")
// 	if (!fs.existsSync(filePath)) {
// 		throw new Error(`File not found: ${filePath}`)
// 	}

// 	const imageBuffer = fs.readFileSync(filePath)
// 	try {
// 		const dimensions = sizeOf(imageBuffer)
// 		return {
// 			width: dimensions.width ?? 0,
// 			height: dimensions.height ?? 0,
// 		}
// 	} catch (error) {
// 		throw new Error(`Failed to get image size: ${filePath}`)
// 	}
// }
//
