import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const notoSansJp = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	preload: false,
	variable: "--font-noto-sans-jp",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Frontend",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${notoSansJp.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
