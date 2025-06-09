/* eslint-disable */

import { useEffect, useState } from "react";

export interface Post {
    id: string;
    title: string;
    content: string;
    header_image: string;
    category: string;
    author: string;
    create_at: string;
    update_at: string;
    status: string;
}

export function usePostsByCategory(category: string) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!category) {
            return;
        }

        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/amg/v1/posts/get-posts-by-category/${category}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await res.json();
                setPosts(data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);

    return { posts: posts || [],
        loading: loading || false,
        error: error || "", };
}