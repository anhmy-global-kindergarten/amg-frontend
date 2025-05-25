/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FloatingMenu } from "@tiptap/extension-floating-menu";
import { ImageResize } from "tiptap-extension-resize-image";
import { CropImageModal } from "@/modals/CropImageModal";
import { toast } from "sonner";

const EditPostPage = () => {
    const { postId } = useParams(); // lấy ID từ URL
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [initialContent, setInitialContent] = useState("");

    const [showCropModal, setShowCropModal] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    // ✅ Editor init
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageResize,
            ImageExtension,
            Link,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            FloatingMenu.configure({
                shouldShow: ({ editor }) => {
                    return editor.view.hasFocus() && editor.state.selection.content().size > 0;
                },
            }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: "min-h-[200px] rounded-lg border border-[#FFA552] p-4 focus:outline-none",
            },
        },
    });

    // ✅ Load post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${postId}`);
                if (!res.ok) {
                    throw new Error("Không thể tải bài viết");
                }
                const data = await res.json();
                setTitle(data.title);
                setImagePreview(data.thumbnailUrl); // nếu có ảnh đại diện
                setInitialContent(data.content);
                editor?.commands.setContent(data.content); // Set lại nội dung
            } catch (err) {
                toast.error("Lỗi khi tải bài viết: " + (err instanceof Error ? err.message : "Không rõ"));
            }
        };

        if (postId && editor) fetchPost();
    }, [postId, editor]);

    // ✅ Xử lý cập nhật bài viết
    const handleUpdatePost = async () => {
        setIsConfirmOpen(false);
        const content = editor?.getHTML() || "";

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (selectedImage) formData.append("thumbnail", selectedImage);

        try {
            const res = await fetch(`/api/posts/${postId}`, {
                method: "PUT", // hoặc PATCH tùy API
                body: formData,
            });

            if (res.ok) {
                alert("Cập nhật bài viết thành công!");
                router.push("/"); // hoặc điều hướng tới trang chi tiết bài viết
            } else {
                throw new Error("Cập nhật thất bại");
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            alert("Có lỗi xảy ra!");
        }
    };

    return (
        <div>
            <header className="w-full py-4 px-4 lg:px-10 flex justify-between items-center bg-[#FFF6C7]">
                <a href="/" className="flex items-center space-x-2">
                    <Image src="/banner/logo.png" alt="Logo" width={120} height={120} />
                    <span className="text-lg font-semibold text-[#FFC107] hover:underline">Trang chủ</span>
                </a>
            </header>

            <section className="w-full bg-[#FFF6C7] min-h-screen px-4 md:px-8 py-10 text-[#4D4D4D]">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6 space-y-6">
                    <h1 className="text-3xl font-bold text-center text-[#F86161]">Chỉnh sửa bài viết</h1>

                    <input
                        type="text"
                        placeholder="Nhập tiêu đề..."
                        className="w-full px-4 py-3 border border-[#FFA552] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA552] text-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div>
                        <label className="block font-semibold mb-1">Ảnh minh họa:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726]"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedImage(file);
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <Image src={imagePreview} alt="Preview" width={400} height={250} className="rounded-lg shadow" />
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold mb-1">Thêm ảnh vào bài viết:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726]"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        setImageToCrop(reader.result as string);
                                        setShowCropModal(true);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />

                        {showCropModal && imageToCrop && (
                            <CropImageModal
                                image={imageToCrop}
                                onCancel={() => setShowCropModal(false)}
                                onConfirm={(croppedUrl) => {
                                    editor?.chain().focus().setImage({ src: croppedUrl }).run();
                                    setShowCropModal(false);
                                }}
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold mb-2">Nội dung bài viết:</label>
                        <div className="border border-[#FFA552] rounded-lg">
                            <div className="flex gap-2 px-4 py-2 bg-[#FFF6C7] border-b border-[#FFA552] rounded-t-lg">
                                <button onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive("bold") ? "font-bold text-[#F86161]" : ""}>B</button>
                                <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive("italic") ? "italic text-[#F86161]" : ""}>I</button>
                                <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive("heading", { level: 2 }) ? "text-[#F86161]" : ""}>H2</button>
                                <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive("bulletList") ? "text-[#F86161]" : ""}>• List</button>
                            </div>

                            <EditorContent editor={editor} className="min-h-[200px] p-4 focus:outline-none" />
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsConfirmOpen(true)}
                            className="bg-[#FFA552] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF9333] transition"
                        >
                            Cập nhật bài viết
                        </button>
                    </div>
                </div>

                <Modal
                    opened={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    title="Xác nhận cập nhật?"
                    centered
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    size="md"
                    withCloseButton={false}
                >
                    <p className="text-center text-sm text-[#666]">Bạn có chắc chắn muốn cập nhật bài viết này không?</p>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="bg-gray-300 px-4 py-2 rounded-full" onClick={() => setIsConfirmOpen(false)}>Hủy</button>
                        <button className="bg-[#FFA552] text-white px-4 py-2 rounded-full" onClick={handleUpdatePost}>Đồng ý</button>
                    </div>
                </Modal>
            </section>
        </div>
    );
};

export default EditPostPage;
