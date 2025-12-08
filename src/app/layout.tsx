import './globals.css';
import Providers from '@/providers/tanstack-query';
import type { Metadata } from 'next';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
	variable: '--font-caveat',
	subsets: ['latin'],
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: 'dearself',
	description: 'What would you tell to your past self?',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${caveat.variable} ${caveat.style} ${caveat.className} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
