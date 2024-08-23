export namespace MDX {
	export interface Props {
		content: string
		meta: Metadata
	}
	export interface Metadata {
		title: string
		description: string
		thumbnail: string
		date: string
		path: string
		tags: string[]
	}
}
