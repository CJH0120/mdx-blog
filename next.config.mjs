import createMDX from "@next/mdx"
/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	experimental: {
		// nextScriptWorkers: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			type: "asset/resource",
			generator: {
				filename: "static/fonts/[name][ext]",
			},
		})

		return config
	},
}

const withMDX = createMDX({
	options: {},
})

export default withMDX(nextConfig)
