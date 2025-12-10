'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePosts } from '@/hooks/Posts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';

export default function Page() {
	const [hoveredCard, setHoveredCard] = useState<string | null>(null);

	const { data: posts, isLoading } = usePosts(20);

	if (!posts || posts.length === 0) {
		return (
			<div className="min-h-screen bg-linear-to-br from-background via-surface/50 to-background p-4">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-20"
					>
						<motion.div
							animate={{
								scale: [1, 1.02, 1],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
							className="inline-block mb-6"
						>
							<div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center mx-auto">
								<span className="text-4xl text-primary">
									✍️
								</span>
							</div>
						</motion.div>
						<p className="text-primary text-xl mb-6 font-light">
							The first whisper begins here...
						</p>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href="/rant"
								className="inline-block bg-linear-to-r from-accent/30 to-accent/10 backdrop-blur-sm text-primary border border-accent/40 px-8 py-3 rounded-full font-semibold hover:border-accent/60 transition-all"
							>
								Start Your Reflection
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-linear-to-br from-background to-surface p-4">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center py-12"
				>
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.8, type: 'spring' }}
						className="relative inline-block mb-6"
					>
						<h1 className="relative text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
							Dear Self,
						</h1>
					</motion.div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="text-secondary text-xl mb-8 font-light tracking-wide"
					>
						Whispers to the person you once were
					</motion.p>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="relative"
					>
						<Link
							href="/rant"
							className="relative inline-block bg-surface/60 backdrop-blur-sm text-primary border border-accent/40 px-8 py-3 rounded-full font-semibold hover:border-accent/60 hover:bg-surface/80 transition-all"
						>
							Share Your Reflection
						</Link>
					</motion.div>
				</motion.header>

				{/* Posts Feed */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="space-y-6"
				>
					{isLoading ? (
						<div className="min-h-screen bg-linear-to-br from-background via-surface/50 to-background p-4">
							<div className="max-w-4xl mx-auto">
								{Array.from({ length: 5 }).map((_, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: i * 0.1 }}
										className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 mb-4 border border-accent/20"
									>
										<Skeleton
											baseColor="#535C91"
											highlightColor="#9290C3"
											height={20}
											width="30%"
											className="mb-4"
										/>
										<Skeleton
											baseColor="#535C91"
											highlightColor="#9290C3"
											height={60}
										/>
										<Skeleton
											baseColor="#535C91"
											highlightColor="#9290C3"
											height={16}
											width="20%"
											className="mt-4"
										/>
									</motion.div>
								))}
							</div>
						</div>
					) : (
						posts.map((post, index) => (
							<motion.article
								key={post.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: index * 0.1,
									duration: 0.5,
								}}
								whileHover={{
									scale: 1.02,
									backgroundColor: 'rgba(27, 26, 85, 0.7)',
								}}
								onHoverStart={() => setHoveredCard(post.id)}
								onHoverEnd={() => setHoveredCard(null)}
								className="relative group bg-surface/40 backdrop-blur-sm rounded-xl p-6 border border-accent/20 hover:border-accent/40 transition-all cursor-pointer overflow-hidden"
								onClick={() =>
									(window.location.href = `/rant/${post.id}`)
								}
							>
								{/* Glow effect on hover */}
								<motion.div
									initial={false}
									animate={{
										opacity:
											hoveredCard === post.id ? 1 : 0,
									}}
									className="absolute inset-0 bg-linear-to-r from-accent/10 to-primary/10 pointer-events-none"
								/>

								<div className="relative z-10">
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center space-x-3">
											<motion.div
												whileHover={{ scale: 1.1 }}
												className="w-10 h-10 bg-linear-to-br from-accent/40 to-primary/40 rounded-full flex items-center justify-center border border-accent/50"
											>
												<span className="text-primary font-semibold text-sm">
													{post.author_name
														? post.author_name
																.charAt(0)
																.toUpperCase()
														: '?'}
												</span>
											</motion.div>
											<div>
												<span className="text-primary text-sm font-medium">
													{post.author_name ||
														'Anonymous Echo'}
												</span>
												<motion.div
													initial={{ width: 0 }}
													animate={{
														width:
															hoveredCard ===
															post.id
																? '100%'
																: 0,
													}}
													className="h-px bg-linear-to-r from-accent to-primary mt-1"
												/>
											</div>
										</div>
									</div>

									<motion.p
										initial={{ opacity: 0.9 }}
										animate={{
											opacity:
												hoveredCard === post.id
													? 1
													: 0.9,
										}}
										className="text-primary/90 leading-relaxed mb-4 font-light tracking-wide"
									>
										{post.content}
									</motion.p>

									<div className="flex items-center justify-between pt-4 border-t border-accent/10">
										<div className="flex items-center space-x-4">
											<motion.div
												whileHover={{ scale: 1.2 }}
												whileTap={{ scale: 0.9 }}
												className="flex items-center space-x-1 text-secondary hover:text-primary transition-colors"
											>
												<span className="text-sm">
													❤️
												</span>
												<span className="text-sm">
													{post.likes_count}
												</span>
											</motion.div>
											{post.is_featured && (
												<motion.span
													initial={{ opacity: 0.8 }}
													animate={{
														opacity:
															hoveredCard ===
															post.id
																? 1
																: 0.8,
														scale:
															hoveredCard ===
															post.id
																? 1.05
																: 1,
													}}
													className="bg-linear-to-r from-accent/20 to-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full border border-accent/30"
												>
													✨ Featured Whisper
												</motion.span>
											)}
										</div>
										<motion.div
											initial={{ opacity: 0 }}
											animate={{
												opacity:
													hoveredCard === post.id
														? 1
														: 0,
											}}
											className="text-secondary/70 text-xs"
										>
											Click to reflect →
										</motion.div>
									</div>
								</div>
							</motion.article>
						))
					)}
				</motion.div>
			</div>
		</div>
	);
}
