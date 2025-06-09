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

export function usePostById(articalId: string) {
    const [post, setPost] = useState<Post | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!articalId) return;

        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/amg/v1/posts/get-post/${articalId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await res.json();
                console.log("Fetched data:", data);
                setPost(data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [articalId]);

    return { post,
        loading,
        error};
}