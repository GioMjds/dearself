'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreatePost } from '@/hooks/Posts';
import { useForm } from 'react-hook-form';

export default function RantPage() {
	const router = useRouter();
	const createPostMutation = useCreatePost();

	const { register, handleSubmit, watch } = useForm({
		mode: 'onBlur',
		defaultValues: {
			content: '',
			author_name: '',
		},
	});

	const watchedContent = watch('content');

	const onSubmit = async (data: { content: string; author_name: string }) => {
		if (!data.content.trim()) return;

		await createPostMutation.mutateAsync({
			content: 'Dear Self, ' + data.content.trim(),
			author_name: data.author_name.trim() || null,
		});

		router.prefetch('/');
		router.push('/');
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-background to-surface p-4 relative overflow-hidden">
			{/* Ripple background layers (behind content) */}
			<motion.div className="absolute inset-0 pointer-events-none z-0">
				<motion.div
					className="absolute left-1/2 top-24 w-[900px] h-[900px] -translate-x-1/2 rounded-full"
					style={{
						background: `radial-gradient(circle at 30% 30%, rgba(146,144,195,0.22), rgba(146,144,195,0.08) 30%, transparent 60%)`,
						filter: 'blur(60px)',
						mixBlendMode: 'screen',
						willChange: 'transform, opacity',
					}}
					animate={{
						scale: [1, 1.08, 1],
						opacity: [0.12, 0.28, 0.12],
						x: [0, -40, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>

				<motion.div
					className="absolute left-1/3 top-40 w-[600px] h-[600px] -translate-x-1/2 rounded-full"
					style={{
						background: `radial-gradient(circle at 50% 50%, rgba(83,89,145,0.20), rgba(83,89,145,0.07) 35%, transparent 65%)`,
						filter: 'blur(50px)',
						mixBlendMode: 'screen',
						willChange: 'transform, opacity',
					}}
					animate={{
						scale: [1, 1.12, 1],
						opacity: [0.08, 0.22, 0.08],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1,
					}}
				/>

				<motion.div
					className="absolute right-1/4 top-10 w-[420px] h-[420px] -translate-x-1/2 rounded-full"
					style={{
						background: `radial-gradient(circle at 60% 40%, rgba(146,144,195,0.22), rgba(83,89,145,0.08) 28%, transparent 60%)`,
						filter: 'blur(36px)',
						mixBlendMode: 'screen',
						willChange: 'transform, opacity',
					}}
					animate={{
						scale: [1, 1.18, 1],
						opacity: [0.06, 0.26, 0.06],
						x: [0, 20, 0],
						y: [0, -20, 0],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 0.6,
					}}
				/>
			</motion.div>

			<div className="max-w-2xl mx-auto relative z-10">
				{/* Header */}
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center py-6 sm:py-8 md:py-12 relative"
				>
					{/* Mobile: inline back link above title */}
					<div className="md:hidden mb-4 text-left">
						<Link
							href="/"
							className="inline-block text-primary hover:text-accent transition-colors"
						>
							← Back to Feed
						</Link>
					</div>

					{/* Desktop: absolute top-left back link */}
					<div className="hidden md:block absolute left-4 top-4">
						<Link
							href="/"
							className="inline-block text-primary/70 hover:text-primary transition-colors"
						>
							← Back to Feed
						</Link>
					</div>

					<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
						What would you like to say to yourself?
					</h1>
					<p className="text-secondary text-sm sm:text-lg">
						Don't worry, you are safe here. Let it all out.
					</p>
				</motion.header>

				{/* Form */}
				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					onSubmit={handleSubmit(onSubmit)}
					className="bg-surface/60 backdrop-blur-sm rounded-xl p-6 border border-accent/20"
				>
					<div className="mb-4">
						<label
							htmlFor="authorName"
							className="block text-2xl font-medium text-primary mb-2"
						>
							Your Name (Optional)
						</label>
						<input
							type="text"
							id="authorName"
							{...register('author_name')}
							className="w-full px-3 py-2 bg-surface/50 border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-primary placeholder:text-secondary/50 transition-all"
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="content"
							className="block text-2xl font-medium text-primary mb-2"
						>
							Dear Self,
						</label>
						<textarea
							id="content"
							{...register('content', { required: true })}
							placeholder="What's on your mind?"
							rows={8}
							className="w-full px-3 py-2 bg-surface/50 border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-primary placeholder:text-secondary/50 resize-none transition-all"
							required
						/>
						{watchedContent && watchedContent.length > 0 && (
							<div className="text-secondary/50 text-xs mt-2">
								{watchedContent.length} characters
							</div>
						)}
					</div>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="submit"
						disabled={
							createPostMutation.isPending ||
							!watchedContent?.trim()
						}
						className="w-full bg-linear-to-r from-accent/80 to-primary/80 text-white py-3 px-4 rounded-lg font-semibold hover:from-accent hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
