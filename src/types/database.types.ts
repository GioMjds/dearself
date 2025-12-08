export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			posts: {
				Row: {
					id: string;
					content: string;
					author_name: string | null;
					created_at: string;
					updated_at: string;
					likes_count: number;
					is_featured: boolean;
				};
				Insert: {
					id?: string;
					content: string;
					author_name?: string | null;
					created_at?: string;
					updated_at?: string;
					likes_count?: number;
					is_featured?: boolean;
				};
				Update: {
					id?: string;
					content?: string;
					author_name?: string | null;
					created_at?: string;
					updated_at?: string;
					likes_count?: number;
					is_featured?: boolean;
				};
			};
			likes: {
				Row: {
					id: string;
					post_id: string;
					fingerprint: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					post_id: string;
					fingerprint: string;
					created_at?: string;
				};
				Update: {
					id?: string;
					post_id?: string;
					fingerprint?: string;
					created_at?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
