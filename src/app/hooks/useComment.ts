// /hooks/usePostComments.ts
/* eslint-disable */
import { useEffect, useState, useCallback } from "react";
import { Comment, CreateCommentPayload } from "@/app/utils/comment";

export function usePostComments(postId: string | undefined) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        if (!postId) {
            setLoading(false);
            setComments([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api-v1/comments/get-comments-in-post?postId=${postId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch comments");
            }
            const data = await res.json();
            setComments(data);
        } catch (err: any) {
            setError(err.message);
            console.error("Fetch comments error:", err);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const updateComment = async (commentId: string, content: string): Promise<boolean> => {
        try {
            const res = await fetch(`/api-v1/comments/update-comment/${commentId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to update comment");
            }
            await fetchComments();
            return true;
        } catch (err: any) {
            console.error("Update comment error:", err);
            return false;
        }
    };

    const createComment = async (payload: CreateCommentPayload): Promise<boolean> => {
        try {
            const res = await fetch(`/api-v1/comments/create-comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to create comment");
            }
            await fetchComments();
            return true;
        } catch (err: any) {
            setError(err.message);
            console.error("Create comment error:", err);
            return false;
        }
    };

    // Hàm xóa comment
    const deleteComment = async (commentId: string): Promise<boolean> => {
        try {
            const res = await fetch(`/api-v1/comments/delete-comment/${commentId}`, {
                method: 'POST',
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to delete comment");
            }

            setComments(prevComments => prevComments.filter(c => c._id !== commentId));

            await fetchComments();
            return true;
        } catch (err: any) {
            setError(err.message);
            console.error("Delete comment error:", err);
            return false;
        }
    };

    return {
        comments,
        loading,
        error,
        createComment,
        deleteComment,
        updateComment,
        refreshComments: fetchComments
    };
}