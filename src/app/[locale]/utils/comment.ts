export interface Comment {
    _id: string;
    postId: string;
    authorId: string | undefined;
    authorName: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected' | 'deleted';
    createdAt: string;
    updatedAt: string;
}

export type CreateCommentPayload = Omit<Comment, '_id' | 'createdAt' | 'updatedAt' | 'status'>;

export type UpdateCommentPayload = Partial<Omit<Comment, '_id' | 'createdAt'>>;