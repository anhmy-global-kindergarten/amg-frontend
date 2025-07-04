// /components/comments/CommentItem.tsx

'use client';
/* eslint-disable */
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { MoreVertical, Send, X } from "lucide-react";
import { Comment } from "@/utils/comment"; // Đảm bảo đường dẫn đúng

interface CommentItemProps {
    comment: Comment;
    currentUser: {
        id?: string | undefined;
        role?: string;
    };
    onDelete: (commentId: string) => Promise<boolean>;
    onUpdate: (commentId: string, newContent: string) => Promise<boolean>;
}

function canUserDelete(item: { authorId?: string }, user: { id?: string, role?: string }): boolean {
    if (!user || !item) return false;
    if (user.role === 'admin') return true;
    if (user.id && item.authorId && user.id === item.authorId) return true;
    return false;
}

function canUserModify(item: { authorId?: string }, user: { id?: string, role?: string }): boolean {
    if (!user || !item) return false;
    if (user.id && item.authorId && user.id === item.authorId) return true;
    return false;
}


export default function CommentItem({ comment, currentUser, onDelete, onUpdate }: CommentItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [isUpdating, setIsUpdating] = useState(false);

    const hasPermissionDelete = canUserDelete(comment, currentUser);
    const hasPermissionEdit = canUserModify(comment, currentUser);

    const handleUpdate = async () => {
        if (editedContent.trim() === comment.content || !editedContent.trim()) {
            setIsEditing(false);
            return;
        }

        setIsUpdating(true);
        const success = await onUpdate(comment._id, editedContent);
        setIsUpdating(false);

        if (success) {
            setIsEditing(false);
        } else {
            alert("Cập nhật bình luận thất bại. Vui lòng thử lại.");
        }
    };

    const handleCancelEdit = () => {
        setEditedContent(comment.content);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
            onDelete(comment._id);
        }
    }

    return (
        <div className="mb-6 bg-[#FFF9E5] p-5 rounded-xl shadow-md border border-[#FFE082] hover:shadow-lg transition-shadow group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-mali text-base font-semibold text-[#795548]">{comment.authorName}</p>
                    <p className="font-mali text-xs text-[#A1887F] italic">{new Date(comment.updatedAt).toLocaleString()}</p>
                </div>
                {hasPermissionDelete && !isEditing && (
                    <div className="relative flex-shrink-0">
                        <Menu>
                            <Menu.Button className="p-1 rounded-full text-black opacity-20 group-hover:opacity-100 transition-opacity">
                                <MoreVertical size={16} />
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-1 w-28 bg-white border rounded-lg shadow-lg z-20">
                                {
                                    hasPermissionEdit && (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button onClick={() => setIsEditing(true)} className={`font-mali block w-full text-left px-3 py-1.5 text-sm text-yellow-600 ${active ? 'bg-yellow-100' : ''}`}>Sửa</button>
                                            )}
                                        </Menu.Item>
                                    )
                                }
                                <Menu.Item>
                                    {({ active }) => (
                                        <button onClick={handleDelete} className={`font-mali block w-full text-left px-3 py-1.5 text-sm text-red-600 ${active ? 'bg-red-50' : ''}`}>Xóa</button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                )}
            </div>

            <div className="mt-2">
                {isEditing ? (
                    <div>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="font-mali w-full p-2 border rounded text-black bg-white"
                            rows={3}
                            autoFocus
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={handleCancelEdit} className="font-mali px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300">Hủy</button>
                            <button onClick={handleUpdate} disabled={isUpdating} className="font-mali px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300">
                                {isUpdating ? 'Đang lưu...' : 'Lưu'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="font-mali text-gray-800 text-sm leading-relaxed whitespace-pre-line">{comment.content}</p>
                )}
            </div>
        </div>
    );
}