import { MDXComponents } from "mdx/types"
import { H1, H2, H3, H4 } from "./h"
import { Code } from "./code"
import { LinkTag } from "./link"
import { ImagesTag } from "./images"
const CustomTag: Readonly<MDXComponents> = {
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	code: Code,
	a: LinkTag,
	img: ImagesTag,
}
export default CustomTag
