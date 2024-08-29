import type { Metadata, Viewport } from "next"
import "./globals.scss"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimationProvider from "@/provider/AnimationProvider"
import iphone from "./apple-touch-icon.png"
import favicon from "./favicon.ico"
import ogImage from "@/public/image/main_og.png"
import { Noto_Sans_KR } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import { Analytics } from "@vercel/analytics/react"

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
}

export const metadata: Metadata = {
	metadataBase: new URL("https://bittenlog.vercel.app"),
	title: {
		default: "Bitten Dev",
		template: "%s | Bitten",
	},
	category: "tech blog",
	description:
		"성장 욕구가 많은 개발자로서, 공부한 내용을 정리하는 개발 블로그 입니다.",
	authors: [{ name: "Bitten", url: "https://bittenlog.vercel.app" }],

	openGraph: {
		images: ogImage.src,
		title: {
			default: "Bitten Dev",
			template: "%s | Bitten",
		},
		description:
			"성장 욕구가 많은 개발자로서, 공부한 내용을 정리하는 개발 블로그 입니다.",
	},
	verification: {
		google: "uBovfhvYdbEJvqXAGE44EfvyNswgNRSOmXXEApmtV_g",
	},
}
const font = Noto_Sans_KR({
	weight: ["300", "400", "500", "700", "800", "900"],
	subsets: ["latin"],
})
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<link rel="icon" href={favicon.src} sizes="any" />
				<link rel="apple-touch-icon" href={iphone.src} />
				<meta name="google-adsense-account" content="ca-pub-3268251593727486" />
			</head>
			<body className={font.className}>
				<AnimationProvider>
					<Header />
					<main className="layout">{children}</main>
					<Footer />
				</AnimationProvider>
				<Analytics />
				<GoogleAnalytics gaId="GTM-5LNSR6M9" />
			</body>
		</html>
	)
}
