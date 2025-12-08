import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getPosts,
	getFeaturedPosts,
	getPostById,
	createPost,
	likePost,
	unlikePost,
	hasLiked,
} from '@/lib/db';
import type { Database } from '@/types/database.types';

type PostInsert = Database['public']['Tables']['posts']['Insert'];

type LikePost = {
    postId: string;
    fingerprint: string;
};

export function usePosts(limit?: number) {
    return useQuery({
        queryKey: ['posts', limit],
        queryFn: () => getPosts(limit),
    });
};

export function useFeaturedPosts() {
    return useQuery({
        queryKey: ['posts', 'featured'],
        queryFn: getFeaturedPosts
    });
};

export function usePost(id: string) {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPostById(id),
    });
};

export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newPost: PostInsert) => createPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => {
            alert('Error creating post. Please try again.');
        }
    });
};

export function useLikePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, fingerprint }: LikePost) => likePost(postId, fingerprint),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => {
            alert('Error liking post. Please try again.');
        }
    });
};

export function useUnlikePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, fingerprint }: LikePost) => unlikePost(postId, fingerprint),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => {
            alert('Error unliking post. Please try again.');
        }
    });
};