import type { Metadata, Viewport } from "next"
import { Roboto } from "next/font/google"
import "./globals.scss"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimationProvider from "@/provider/AnimationProvider"
import iphone from "./apple-touch-icon.png"
import favicon from "./favicon.ico"
import ogImage from "@/public/image/main_og.png"
const inter = Roboto({
	subsets: ["vietnamese", "latin"],
	weight: ["400", "700"],
	variable: "--font-inter",
})
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
	description:
		"성장 욕구가 많은 개발자로서, 공부한 내용을 정리하는 개발 블로그 입니다.",

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
		google: "YVXKm27ccjmhfdeDUK6IxOkBx5XmDpjP0deNtjWEJwc",
	},
}

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
			</head>
			<body className={inter.className}>
				<AnimationProvider>
					<Header />
					<main className="layout">{children}</main>
					<Footer />
				</AnimationProvider>
			</body>
		</html>
	)
}
