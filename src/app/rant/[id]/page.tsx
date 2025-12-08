'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePost } from '@/hooks/Posts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RantDetailPage() {
	const params = useParams();
	const id = params.id as string;
	const { data: post, isLoading, error } = usePost(id);

	if (error) {
		return (
			<div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-4">
				<div className="max-w-2xl mx-auto text-center py-12">
					<h1 className="text-2xl font-bold text-gray-800 mb-4">
						Rant not found
					</h1>
					<Link
						href="/"
						className="text-purple-600 hover:text-purple-800"
					>
						← Back to Feed
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-4">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="py-8"
				>
					<Link
						href="/"
						className="inline-block text-purple-600 hover:text-purple-800 mb-4"
					>
						← Back to Feed
					</Link>
				</motion.header>

				{/* Post */}
				<motion.article
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="bg-white rounded-lg p-8 shadow-sm"
				>
					{isLoading ? (
						<>
							<div className="flex items-center space-x-2 mb-4">
								<Skeleton circle width={32} height={32} />
								<Skeleton width={100} />
							</div>
							<Skeleton height={200} />
							<div className="mt-4">
								<Skeleton width={50} />
							</div>
						</>
					) : post ? (
						<>
							<div className="flex items-start justify-between mb-6">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
										<span className="text-purple-600 font-semibold">
											{post.author_name
												? post.author_name
														.charAt(0)
														.toUpperCase()
												: '?'}
										</span>
									</div>
									<div>
										<h2 className="text-lg font-semibold text-gray-800">
											{post.author_name || 'Anonymous'}
										</h2>
										<p className="text-gray-500 text-sm">
											{new Date(
												post.created_at
											).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
												hour: '2-digit',
												minute: '2-digit',
											})}
										</p>
									</div>
								</div>
								{post.is_featured && (
									<span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
										Featured
									</span>
								)}
							</div>

							<div className="prose prose-gray max-w-none mb-6">
								<p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
									{post.content}
								</p>
							</div>

							<div className="flex items-center justify-between pt-4 border-t border-gray-100">
								<div className="flex items-center space-x-2">
									<button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
										<span>❤️</span>
										<span>{post.likes_count}</span>
									</button>
								</div>
								<button
									onClick={() => {
										navigator.share?.({
											title: 'Check out this rant',
											text:
												post.content.slice(0, 100) +
												'...',
											url: window.location.href,
										});
									}}
									className="text-gray-500 hover:text-gray-700 transition-colors"
								>
									Share
								</button>
							</div>
						</>
					) : null}
				</motion.article>
			</div>
		</div>
	);
}
