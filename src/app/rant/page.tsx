'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreatePost } from '@/hooks/Posts';

export default function RantPage() {
	const [content, setContent] = useState('');
	const [authorName, setAuthorName] = useState('');
	const router = useRouter();
	const createPostMutation = useCreatePost();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim()) return;

		try {
			const newPost = await createPostMutation.mutateAsync({
				content: content.trim(),
				author_name: authorName.trim() || null,
			});
			router.push(`/rant/${newPost.id}`);
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-4">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center py-8"
				>
					<Link
						href="/"
						className="inline-block text-purple-600 hover:text-purple-800 mb-4"
					>
						← Back to Feed
					</Link>
					<h1 className="text-4xl font-bold text-gray-800 mb-4">
						Share Your Thoughts
					</h1>
					<p className="text-gray-600">
						Write what's on your mind. Your name is optional.
					</p>
				</motion.header>

				{/* Form */}
				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					onSubmit={handleSubmit}
					className="bg-white rounded-lg p-6 shadow-sm"
				>
					<div className="mb-4">
						<label
							htmlFor="authorName"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Your Name (Optional)
						</label>
						<input
							type="text"
							id="authorName"
							value={authorName}
							onChange={(e) => setAuthorName(e.target.value)}
							placeholder="Anonymous"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="content"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Your Thoughts
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="What's on your mind?"
							rows={8}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
							required
						/>
					</div>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="submit"
						disabled={
							createPostMutation.isPending || !content.trim()
						}
						className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{createPostMutation.isPending
							? 'Sharing...'
							: 'Share Your Thoughts'}
					</motion.button>
				</motion.form>
			</div>
		</div>
	);
}
