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

export interface ImageWithStyle {
    id: string;
    url: string;
    style?: string;
}

interface PostData {
    post?: Post;
    images?: ImageWithStyle[];
}

export function useSinglePostByCategory(category: string) {
    const [data, setData] = useState<PostData>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!category) {
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api-v1/posts/get-single-post-by-category/${category}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch post");
                }
                const result = await res.json()
                setData({
                    post: result
                });
            } catch (err: any) {
                setError(err.message);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [category]);

    return { post: data.post, images: data.images, loading, error };
}