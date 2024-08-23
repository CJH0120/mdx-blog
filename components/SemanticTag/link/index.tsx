import Link from "next/link"
import { FC, PropsWithChildren } from "react"

interface LinkProps extends PropsWithChildren {
	href?: string
}
export const LinkTag: FC<LinkProps> = ({ children, href = "/" }) => {
	return (
		<Link target="_blank" href={href}>
			{children}
		</Link>
	)
}
