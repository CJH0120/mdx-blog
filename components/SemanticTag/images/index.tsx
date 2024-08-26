import { FC, ImgHTMLAttributes } from "react"
import path from "path"
import getImageSize from "image-size"
import Image from "next/image"

interface ImagesTagProps extends ImgHTMLAttributes<HTMLImageElement> {}

const basePath = "/"

export const ImagesTag: FC<ImagesTagProps> = ({
	src,
	width,
	height,
	alt,
	...restProps
}) => {
	if (!src) return null

	const isLocalImage = !src.startsWith("http")
	const newProps: ImagesTagProps = { ...restProps, width, height }

	if (isLocalImage) {
		if (!width || !height) {
			const fileName = src.replace("image", "")
			const filePath = path.join(process.cwd(), "public", "image", fileName)

			try {
				const dimensions = getImageSize(filePath)
				newProps.width = dimensions.width
				newProps.height = dimensions.height
			} catch (error) {
				console.error("Error getting image size:", error)
			}
		}

		if (!src.startsWith(basePath)) {
			newProps.src = `${basePath}${src}`
		}
	}

	const aspectRatio = width && height ? `${width}/${height}` : "16/9"

	return (
		<span
			style={{
				display: "inline-block",
				position: "relative",
				overflow: "hidden",
				width: "100%",
				maxWidth: width || "inherit",
				aspectRatio,
			}}
		>
			<Image
				draggable={false}
				src={newProps.src || src}
				alt={alt || "Image"}
				fill
				blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
				placeholder="blur"
				quality={85}
				style={{
					objectFit: "cover",
				}}
			/>
		</span>
	)
}
