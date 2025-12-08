import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/types/database.types';

type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];

// Get all posts (sorted by newest first)
export async function getPosts(limit = 50) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(limit);

	if (error) throw error;
	return data as Post[];
}

// Get featured posts
export async function getFeaturedPosts() {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('is_featured', true)
		.order('likes_count', { ascending: false })
		.limit(10);

	if (error) throw error;
	return data as Post[];
}

// Get a single post by id
export async function getPostById(id: string) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('id', id)
		.single();

	if (error) throw error;
	return data as Post;
}

// Create a new post
export async function createPost(post: PostInsert) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('posts')
		.insert(post)
		.select()
		.single();

	if (error) throw error;
	return data as Post;
}

// Like a post
export async function likePost(postId: string, fingerprint: string) {
	const supabase = createClient();
	const { error } = await supabase
		.from('likes')
		.insert({ post_id: postId, fingerprint });

	if (error) throw error;
}

// Unlike a post
export async function unlikePost(postId: string, fingerprint: string) {
	const supabase = createClient();
	const { error } = await supabase
		.from('likes')
		.delete()
		.eq('post_id', postId)
		.eq('fingerprint', fingerprint);

	if (error) throw error;
}

// Check if user liked a post
export async function hasLiked(postId: string, fingerprint: string) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('likes')
		.select('id')
		.eq('post_id', postId)
		.eq('fingerprint', fingerprint)
		.single();

	if (error && error.code !== 'PGRST116') throw error;
	return !!data;
}
