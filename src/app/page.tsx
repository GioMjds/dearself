
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePosts } from '@/hooks/Posts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Page() {
  const { data: posts, isLoading } = usePosts(20);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Dear Self,
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            What would you tell your past self?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/rant"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Share Your Thoughts
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
            Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <Skeleton height={20} width="30%" className="mb-2" />
                <Skeleton height={60} />
                <Skeleton height={16} width="20%" className="mt-2" />
              </motion.div>
            ))
          ) : posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/rant/${post.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {post.author_name ? post.author_name.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {post.author_name || 'Anonymous'}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 leading-relaxed mb-3">
                  {post.content}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>❤️ {post.likes_count}</span>
                  {post.is_featured && (
                    <span className="text-purple-600 font-semibold">Featured</span>
                  )}
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No rants yet. Be the first to share!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}