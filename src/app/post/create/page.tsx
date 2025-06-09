/* eslint-disable */
"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FloatingMenu } from "@tiptap/extension-floating-menu";
import {ImageResize} from "tiptap-extension-resize-image";
import {CropImageModal} from "@/modals/CropImageModal";

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [error, setError] = useState("");

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

    const handleValidateAndConfirm = () => {
        setError(""); // clear previous error

        if (!category || category === "") {
            setError("Vui lòng chọn danh mục.");
            return;
        }

        if (!title.trim()) {
            setError("Vui lòng nhập tiêu đề bài viết.");
            return;
        }

        if (!editor?.getText().trim()) {
            setError("Vui lòng nhập nội dung bài viết.");
            return;
        }

        if (!selectedImage) {
            setError("Vui lòng chọn ảnh minh họa.");
            return false;
        }

        // Nếu mọi thứ hợp lệ, mới mở modal
        setIsConfirmOpen(true);
    };
    const [name, setName] = useState("");
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                // setUser(parsed);
                setName(parsed?.user?.name || parsed?.name || null);
            }
        } catch (error) {
            console.error("Lỗi đọc user từ sessionStorage:", error);
        }
    }, []);
    const handlePostSubmit = async () => {
        setIsConfirmOpen(false);
        setError("");

        const content = editor?.getHTML() || "";
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (selectedImage) {
            formData.append("headerImage", selectedImage);
        }
        formData.append("category", category);
        formData.append("author", name);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/amg/v1/posts/create-post`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                alert(`Lỗi: ${error.error}`);
                return;
            }

            const result = await response.json();
            console.log("Post created:", result);
            alert("Bài viết đã được tạo!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Có lỗi xảy ra!");
        }
    };

    const [showCropModal, setShowCropModal] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [category, setCategory] = useState("");

    const categories = [
        { value: "", label: "Chọn danh mục" },
        { value: "artical-lessons", label: "Tiết học của con" },
        { value: "event", label: "Sự kiện AMG" },
        { value: "recruitment", label: "Tuyển dụng" },
        { value: "handy-baby", label: "Bé khéo tay" },
        { value: "handbook", label: "Cẩm nang chăm trẻ" },
        { value: "online", label: "Học online cùng AMG" },
        { value: "admission", label: "Thông tin tuyển sinh" },
    ];
    return (
        <div>
            <header className="w-full py-4 px-4 lg:px-10 flex justify-between items-center bg-[#FFF6C7]">
                <div className="flex items-center space-x-3">
                    <a href="/" className="flex items-center space-x-2">
                        <Image
                            src="/banner/logo.png"
                            alt="Logo"
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                        <span className="text-lg font-semibold text-[#FFC107] hover:underline transition">
                            Trang chủ
                        </span>
                    </a>
                </div>
            </header>

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
                <label className="block font-semibold mb-1 mt-4">Danh mục bài viết:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-[#FFA552] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA552] text-lg bg-white"
                >
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block font-semibold mb-1">Ảnh minh họa:</label>
                <input className="bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726]" type="file"
                       accept="image/*" onChange={handleImageChange}/>
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
            <div className="items-center gap-4 mt-4">
                <label className="block font-semibold mb-1">Thêm ảnh vào bài viết:</label>
                <input
                    className="bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726]"
                    type="file"
                    accept="image/*"
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
                        onConfirm={(croppedUrl: any) => {
                            editor?.chain().focus().setImage({src: croppedUrl}).run();
                            setShowCropModal(false);
                        }}
                    />
                )}
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
                                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                                className={editor.isActive("heading", {level: 2}) ? "text-[#F86161]" : ""}
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

                        <EditorContent editor={editor} className="min-h-[200px] p-4 focus:outline-none"/>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-sm mb-4" role="alert">
                    {error}
                </p>
            )}
            <div className="text-center mt-6">
                <button
                    onClick={handleValidateAndConfirm}
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
        </div>
    );
};

export default CreatePostPage;
