"use client";
/* eslint-disable */
import React, {useCallback, useEffect, useState} from "react";
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
import {Paragraph} from "@tiptap/extension-paragraph";
import { Heading } from "@tiptap/extension-heading";
import {Underline} from "@tiptap/extension-underline";
import Highlight from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';
import { PasteRule } from '@tiptap/core';
import {useAuth} from "@/app/hooks/useAuth";

const youtubeRegex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([\w-]{11})(?:\S+)?/g;
const CustomYoutube = Youtube.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            textAlign: {
                default: 'left',
            },
        };
    },
    renderHTML({ node, HTMLAttributes }) {
        const textAlign = node.attrs.textAlign || 'left';
        return [
            'div',
            {
                'data-youtube-video': '',
                style: `display: flex; justify-content: center;`,
            },
            ['iframe', HTMLAttributes],
        ];
    },
    addPasteRules(): PasteRule[] {
        return [
            {
                find: youtubeRegex,
                handler: ({ chain, range, match }) => {
                    const youtubeIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([\w-]{11})/;
                    const videoIdMatch = match[0].match(youtubeIdRegex);

                    if (videoIdMatch && videoIdMatch[1]) {
                        const videoId = videoIdMatch[1];

                        const { controls, modestBranding, rel } = this.options;

                        let embedUrl = `https://www.youtube.com/embed/${videoId}?`;
                        const params = [];
                        params.push(`modestbranding=${modestBranding ? 1 : 0}`);
                        params.push(`rel=${rel ? 1 : 0}`);
                        params.push(`controls=${controls ? 1 : 0}`);
                        embedUrl += params.join('&');

                        chain()
                            .focus()
                            .deleteRange(range)
                            .setYoutubeVideo({ src: embedUrl })
                            .setTextAlign('center')
                            .run();
                    }
                },
            },
        ];
    },
});

const CustomImage = ImageExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(), // Giữ lại các thuộc tính gốc như src, alt
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => (attributes.style ? { style: attributes.style } : {}),
            },
        };
    },
});

// 2. Custom Paragraph để lưu text-align
const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(), // Giữ lại thuộc tính gốc
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => (attributes.style ? { style: attributes.style } : {}),
            },
        };
    },
});

// 3. Custom Heading để lưu text-align
const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(), // Giữ lại thuộc tính gốc
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => (attributes.style ? { style: attributes.style } : {}),
            },
        };
    },
});

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [error, setError] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: false,
                heading: false,
                codeBlock: false,
                code: false,
            }),

            CustomParagraph,
            CustomHeading.configure({ levels: [1, 2, 3, 4] }),
            CustomImage,
            ImageResize,
            Link,
            TextAlign.configure({ types: ["heading", "paragraph", "youtube"] }),
            Underline,
            Highlight.configure({
                multicolor: true,
            }),
            FloatingMenu.configure({
                shouldShow: ({ editor }) => {
                    return editor.view.hasFocus() && editor.state.selection.content().size > 0;
                },
            }),
            CustomYoutube.configure({
                controls: true,
                modestBranding: true,
                rel: 0,
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "min-h-[200px] rounded-lg border border-[#FFA552] p-4 focus:outline-none",
            },
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) {
            return;
        }
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    function dataURLtoFile(dataUrl: string, filename: string): File | null {
        const arr = dataUrl.split(',');
        if (arr.length < 2) return null;
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return null;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const [originalFileName, setOriginalFileName] = useState<string>("");
    async function uploadContentImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`/api-v1/images/upload-image`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Tải ảnh thất bại.");
            }

            const result = await response.json();
            if (!result.url) {
                throw new Error("Không tìm thấy URL ảnh.");
            }

            return result.url;
        } catch (error) {
            console.error("Image upload error:", error);
            alert("Lỗi tải ảnh lên, vui lòng thử lại.");
            throw error;
        }
    }

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
    const { name, role } = useAuth();

    const extractImageInfo = (): { url: string; style: string }[] => {
        if (!editor) return [];

        const imageInfo: { url: string; style: string }[] = [];
        const { state } = editor;
        const { doc } = state;

        doc.descendants((node) => {
            if (node.type.name === 'image') {
                const { src, style } = node.attrs;
                if (src) {
                    imageInfo.push({
                        url: src,
                        style: style || '', // Lấy style, nếu không có thì là chuỗi rỗng
                    });
                }
            }
        });

        return imageInfo;
    };

    const handlePostSubmit = async () => {
        setIsConfirmOpen(false);
        setError("");

        // 1. Trích xuất thông tin ảnh (URL và Style)
        const imagesToUpdate = extractImageInfo();

        // 2. Lấy HTML content và làm sạch nó (tùy chọn, nhưng khớp với backend)
        const rawContent = editor?.getHTML() || "";


        // 3. Chuẩn bị dữ liệu cho việc tạo bài viết
        const postFormData = new FormData();
        postFormData.append("title", title);
        postFormData.append("content", rawContent); // Gửi content đã làm sạch
        if (selectedImage) {
            postFormData.append("header_image", selectedImage);
        }
        postFormData.append("category", category);
        postFormData.append("author", name || "");

        try {
            // 4. Gửi đồng thời 2 request
            const updateImagesPromise = fetch(`/api-v1/images/update-status`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(imagesToUpdate),
            });

            const createPostPromise = fetch(`/api-v1/posts/create-post`, {
                method: "POST",
                body: postFormData,
            });

            // Chờ cả hai hoàn thành
            const [updateResponse, createResponse] = await Promise.all([updateImagesPromise, createPostPromise]);

            // 5. Xử lý kết quả
            if (!updateResponse.ok) {
                console.error("Lỗi cập nhật trạng thái ảnh!");
                // Có thể không cần báo lỗi này cho người dùng
            }

            if (!createResponse.ok) {
                const error = await createResponse.json();
                alert(`Lỗi tạo bài viết: ${error.error}`);
                return;
            }

            const result = await createResponse.json();
            alert("Bài viết đã được tạo thành công!");
            // Chuyển hướng hoặc reset form ở đây
            window.location.href = `/`;
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Có lỗi nghiêm trọng xảy ra!");
        }
    };

    const [showCropModal, setShowCropModal] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [category, setCategory] = useState("");

    const categories = [
        { value: "", label: "Chọn danh mục" },
        { value: "artical-lessons", label: "Tiết học của con" },
        { value: "events", label: "Sự kiện AMG" },
        { value: "recruitments", label: "Tuyển dụng" },
        { value: "handy-baby", label: "Bé khéo tay" },
        { value: "handbooks", label: "Cẩm nang chăm trẻ" },
        { value: "learn-online", label: "Học online cùng AMG" },
        { value: "admissions", label: "Thông tin tuyển sinh" },
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
                {/*<input className="bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726]" type="file"*/}
                {/*       accept="image/*" onChange={handleImageChange}/>*/}
                {/*{imagePreview && (*/}
                {/*    <div className="mt-4">*/}
                {/*        <Image*/}
                {/*            src={imagePreview}*/}
                {/*            alt="Preview"*/}
                {/*            width={400}*/}
                {/*            height={250}*/}
                {/*            className="rounded-lg shadow border border-gray-200"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <label
                        htmlFor="header-image-upload"
                        className="cursor-pointer bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726] transition-colors whitespace-nowrap inline-block text-center"
                    >
                        Chọn tệp
                    </label>
                    <input
                        id="header-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden" // Ẩn input gốc đi
                    />
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
            </div>
            <div className="mt-4">
                <label className="block font-semibold mb-2">Thêm ảnh vào bài viết:</label>
                <div>
                    <label
                        htmlFor="content-image-upload"
                        className="cursor-pointer inline-block bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726] transition-colors"
                    >
                        Tải ảnh lên
                    </label>
                    <input
                        id="content-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden" // Ẩn input gốc đi
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setOriginalFileName(file.name);
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setImageToCrop(reader.result as string);
                                    setShowCropModal(true);
                                };
                                reader.readAsDataURL(file);
                            }
                            e.target.value = ''; // Reset input để có thể chọn lại cùng 1 file
                        }}
                    />
                </div>

                {showCropModal && imageToCrop && (
                    <CropImageModal
                        image={imageToCrop}
                        onCancel={() => setShowCropModal(false)}
                        onConfirm={async (croppedDataUrl: string) => {
                            setShowCropModal(false);

                            const croppedFile = dataURLtoFile(croppedDataUrl, originalFileName);
                            if (!croppedFile) {
                                alert("Không thể xử lý ảnh đã crop.");
                                return;
                            }

                            try {
                                const imageUrl = await uploadContentImage(croppedFile);
                                if (imageUrl && editor) {
                                    editor.chain().focus().setImage({src: imageUrl, alt: originalFileName}).run();
                                }
                            } catch (error) {
                                console.log("Không thể chèn ảnh do lỗi upload.");
                            }
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
                                disabled={!editor.can().chain().focus().toggleBold().run()}
                                className={editor.isActive('bold') ? 'is-active' : ''}
                                title="Bold"
                            >
                                <span className="font-bold">B</span>
                            </button>

                            <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                disabled={!editor.can().chain().focus().toggleItalic().run()}
                                className={editor.isActive('italic') ? 'is-active' : ''}
                                title="Italic"
                            >
                                <span className="italic">I</span>
                            </button>

                            <button
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                                className={editor.isActive('underline') ? 'is-active' : ''}
                                title="Underline"
                            >
                                <span className="underline">U</span>
                            </button>

                            <button
                                onClick={() => editor.chain().focus().toggleHighlight({color: '#FACBCC'}).run()}
                                className={editor.isActive('highlight', {color: '#FACBCC'}) ? 'is-active' : ''}
                                title="Highlight"
                            >
                                Highlight
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
