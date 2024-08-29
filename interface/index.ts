export namespace MDX {
	export interface Props {
		content?: string
		meta: Metadata
	}
	export interface Metadata {
		title: string
		description: string
		thumbnail: string
		date: string
		series: string
		path: string
		tags: string[]
	}
	export interface DetailProps {
		content: string
		meta: Metadata
		series: Metadata[] | null
		tags: recommend[] | null
	}
}

interface recommend {
	[key: string]: MDX.Metadata[]
}
