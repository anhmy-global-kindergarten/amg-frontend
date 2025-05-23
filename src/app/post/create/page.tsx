"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FloatingMenu } from "@tiptap/extension-floating-menu";
import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react';

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension,
            Link,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            FloatingMenu.configure({
                shouldShow: ({ editor }) => {
                    return editor.view.hasFocus() && editor.state.selection.content().size > 0;
                },
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "min-h-[200px] rounded-lg border border-[#FFA552] p-4 focus:outline-none",
            },
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handlePostSubmit = () => {
        setIsConfirmOpen(false);
        const content = editor?.getHTML() || "";
        console.log({ title, content, selectedImage });
        alert("Bài viết đã được tạo!");
    };

    return (
        <section className="w-full bg-[#FFF6C7] min-h-screen px-4 md:px-8 py-10 text-[#4D4D4D]">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center text-[#F86161]">Tạo bài viết mới</h1>

                <input
                    type="text"
                    placeholder="Nhập tiêu đề..."
                    className="w-full px-4 py-3 border border-[#FFA552] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA552] text-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div>
                    <label className="block font-semibold mb-1">Ảnh minh họa:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                    {imagePreview && (
                        <div className="mt-4">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                width={400}
                                height={250}
                                className="rounded-lg shadow border border-gray-200"
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => document.getElementById("editor-image-input")?.click()}
                        className="bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726]"
                    >
                        🖼️ Thêm ảnh vào nội dung
                    </button>

                    <input
                        type="file"
                        id="editor-image-input"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    const url = reader.result?.toString();
                                    if (url) {
                                        editor?.chain().focus().setImage({src: url}).run();
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-semibold mb-2">Nội dung bài viết:</label>
                    {editor && (
                        <div className="border border-[#FFA552] rounded-lg">
                            {/* TOOLBAR CỐ ĐỊNH */}
                            <div className="flex gap-2 px-4 py-2 bg-[#FFF6C7] border-b border-[#FFA552] rounded-t-lg">
                                <button
                                    onClick={() => editor.chain().focus().toggleBold().run()}
                                    className={editor.isActive("bold") ? "font-bold text-[#F86161]" : ""}
                                >
                                    B
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleItalic().run()}
                                    className={editor.isActive("italic") ? "italic text-[#F86161]" : ""}
                                >
                                    I
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={editor.isActive("heading", { level: 2 }) ? "text-[#F86161]" : ""}
                                >
                                    H2
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                                    className={editor.isActive("bulletList") ? "text-[#F86161]" : ""}
                                >
                                    • List
                                </button>
                            </div>

                            <EditorContent editor={editor} className="min-h-[200px] p-4 focus:outline-none" />
                        </div>
                    )}
                </div>

                <div className="text-center mt-6">
                    <button
                        onClick={() => setIsConfirmOpen(true)}
                        className="bg-[#FFA552] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF9333] transition"
                    >
                        Đăng bài
                    </button>
                </div>
            </div>

            <Modal
                opened={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                title="Xác nhận đăng bài?"
                centered
                overlayOpacity={0.55}
                overlayBlur={3}
                size="md"
                withCloseButton={false}
            >
                <p className="text-center text-sm text-[#666]">
                    Bạn có chắc chắn muốn đăng bài viết này không?
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-full"
                        onClick={() => setIsConfirmOpen(false)}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-[#FFA552] text-white px-4 py-2 rounded-full"
                        onClick={handlePostSubmit}
                    >
                        Đồng ý
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default CreatePostPage;
