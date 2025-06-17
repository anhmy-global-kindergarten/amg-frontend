/* eslint-disable */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import { PasteRule } from '@tiptap/core';
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FloatingMenu } from "@tiptap/extension-floating-menu";
import { ImageResize } from "tiptap-extension-resize-image";
import { CropImageModal } from "@/modals/CropImageModal";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Heading } from "@tiptap/extension-heading";
import { Underline } from "@tiptap/extension-underline";
import Highlight from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';
import { usePostById } from "@/app/hooks/usePostById";
import {useAuth} from "@/app/hooks/useAuth"; // Giữ lại hook của bạn

// ===================================================================
// BỘ EXTENSIONS GIỐNG HỆT TRANG CREATE
// ===================================================================

const youtubeRegex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([\w-]{11})(?:\S+)?/g;

const CustomYoutube = Youtube.extend({
    addAttributes() {
        return { ...this.parent?.(), textAlign: { default: 'left' } };
    },
    renderHTML({ node, HTMLAttributes }) {
        const textAlign = node.attrs.textAlign || 'left';
        return ['div', { 'data-youtube-video': '', style: `text-align: ${textAlign}` }, ['iframe', HTMLAttributes]];
    },
    addPasteRules(): PasteRule[] {
        return [{
            find: youtubeRegex,
            handler: ({ chain, range, match }) => {
                const url = match[0];
                if (!url) return;
                chain().focus().deleteRange(range).setYoutubeVideo({ src: url }).setTextAlign('center').run();
            },
        }];
    },
});

const CustomImage = ImageExtension.extend({
    addAttributes() {
        return { ...this.parent?.(), style: { default: null, parseHTML: e => e.getAttribute('style'), renderHTML: a => (a.style ? { style: a.style } : {}) } };
    },
});

const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return { ...this.parent?.(), style: { default: null, parseHTML: e => e.getAttribute('style'), renderHTML: a => (a.style ? { style: a.style } : {}) } };
    },
});

const CustomHeading = Heading.extend({
    addAttributes() {
        return { ...this.parent?.(), style: { default: null, parseHTML: e => e.getAttribute('style'), renderHTML: a => (a.style ? { style: a.style } : {}) } };
    },
});


// ===================================================================
// COMPONENT EDIT POST
// ===================================================================
const EditPostPage = () => {
    const params = useParams();
    const router = useRouter();
    const postId = params?.postId as string;

    // ✅ 1. Lấy dữ liệu bài viết hiện tại
    const { post, loading, error: fetchError } = usePostById(postId);

    // ✅ 2. State giống hệt trang Create
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // Ảnh minh họa MỚI
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview ảnh minh họa
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [error, setError] = useState("");
    // State cho việc thêm ảnh vào content
    const [originalFileName, setOriginalFileName] = useState<string>("");
    const [showCropModal, setShowCropModal] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    // ✅ 3. Editor với bộ extensions đầy đủ
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ paragraph: false, heading: false, codeBlock: false, code: false }),
            CustomParagraph,
            CustomHeading.configure({ levels: [1, 2, 3, 4] }),
            CustomImage,
            ImageResize,
            Link.configure({ openOnClick: false, autolink: true }),
            TextAlign.configure({ types: ["heading", "paragraph", "youtube"] }),
            Underline,
            Highlight.configure({ multicolor: true }),
            FloatingMenu.configure({ shouldShow: ({ editor }) => editor.view.hasFocus() && editor.state.selection.content().size > 0 }),
            CustomYoutube.configure({ controls: true, modestBranding: true, rel: 0 }),
        ],
        content: "", // Sẽ được fill bằng useEffect
        editorProps: {
            attributes: {
                class: "min-h-[200px] rounded-lg border border-[#FFA552] p-4 focus:outline-none",
            },
        },
    });

    // ✅ 4. useEffect để điền dữ liệu vào form và editor khi có
    useEffect(() => {
        if (post && editor && !editor.isDestroyed) {
            setTitle(post.title);
            setCategory(post.category);
            // Hiển thị ảnh minh họa cũ
            if (post.header_image) {
                setImagePreview(post.header_image);
            }
            if (editor.isEmpty) {
                editor.commands.setContent(post.content);
            }
        }
    }, [post, editor]);

    const { name, role } = useAuth();

    // ✅ 5. Các hàm helper giống hệt trang Create
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

    const handleValidateAndConfirm = () => {
        setError("");
        if (!category) { setError("Vui lòng chọn danh mục."); return; }
        if (!title.trim()) { setError("Vui lòng nhập tiêu đề."); return; }
        if (!editor?.getText().trim() && !editor?.getHTML().includes('<img') && !editor?.getHTML().includes('<iframe')) {
            setError("Vui lòng nhập nội dung.");
            return;
        }
        // Ảnh minh họa không bắt buộc phải thay đổi khi edit
        setIsConfirmOpen(true);
    };

    const handleUpdatePost = async () => {
        setIsConfirmOpen(false);
        setError("");

        const imagesToUpdate = extractImageInfo();

        const postFormData = new FormData();
        postFormData.append("title", title);
        postFormData.append("content", editor?.getHTML() || "");
        postFormData.append("category", category);
        postFormData.append("author", name || "");

        if (selectedImage) {
            postFormData.append("header_image", selectedImage);
        }

        try {
            // BƯỚC 1: Khởi tạo TẤT CẢ các promise MÀ KHÔNG AWAIT
            const updateImagesPromise = fetch(`/api-v1/images/update-status`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(imagesToUpdate),
            });

            const updatePostPromise = fetch(`/api-v1/posts/update-post/${postId}`, {
                method: "POST",
                body: postFormData,
            });

            const [updateImagesResponse, updatePostResponse] = await Promise.all([
                updateImagesPromise,
                updatePostPromise
            ]);

            if (!updateImagesResponse.ok) {
                console.error("Lỗi cập nhật trạng thái ảnh!");
            }

            if (!updatePostResponse.ok) {
                let errorMessage = 'Lỗi không xác định khi cập nhật bài viết.';
                const contentType = updatePostResponse.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    const errorData = await updatePostResponse.json();
                    errorMessage = errorData.error || JSON.stringify(errorData);
                } else {
                    errorMessage = await updatePostResponse.text();
                }

                alert(`Lỗi cập nhật bài viết: ${errorMessage}`);
                console.error("Update Post Error:", errorMessage);
                return;
            }

            alert("Cập nhật bài viết thành công!");
            router.push(`/`);

        } catch (err: any) {
            console.error("Lỗi khi cập nhật bài viết:", err);
            setError(`Có lỗi xảy ra: ${err.message}`);
            alert(`Có lỗi xảy ra: ${err.message}`);
        }
    };

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

    if (loading) return <div className="flex justify-center items-center h-screen">Đang tải dữ liệu bài viết...</div>;
    if (fetchError) return <div className="flex justify-center items-center h-screen text-red-500">Lỗi: {fetchError}</div>;

    return (
        <div>
            <header className="w-full py-4 px-4 lg:px-10 flex justify-between items-center bg-[#FFF6C7]">
                <a href="/" className="flex items-center space-x-2">
                    <Image src="/banner/logo.png" alt="Logo" width={120} height={120} className="object-contain" />
                    <span className="text-lg font-semibold text-[#FFC107] hover:underline transition">Trang chủ</span>
                </a>
            </header>

            <section className="w-full bg-[#FFF6C7] min-h-screen px-4 md:px-8 py-10 text-[#4D4D4D]">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6 space-y-6">
                    <h1 className="text-3xl font-bold text-center text-[#F86161]">Chỉnh sửa bài viết</h1>

                    <input type="text" placeholder="Nhập tiêu đề..." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-[#FFA552] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA552] text-lg" />

                    <div>
                        <label className="block font-semibold mb-1 mt-4">Danh mục bài viết:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-[#FFA552] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA552] text-lg bg-white">
                            {categories.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Ảnh minh họa (thay đổi nếu cần):</label>
                        <label
                            htmlFor="edit-header-image-upload"
                            className="cursor-pointer bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726] transition-colors whitespace-nowrap inline-block text-center"
                        >
                            Chọn tệp mới
                        </label>
                        <input
                            id="edit-header-image-upload"
                            className="hidden w-full max-w-full text-sm text-white px-3 py-2 rounded-full hover:bg-[#FFA552] file:cursor-pointer file:border-0 file:bg-[#FFA552] file:text-white file:px-4 file:py-2"
                            type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setSelectedImage(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}/>
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm mb-2">Ảnh hiện tại:</p>
                                <Image src={imagePreview} alt="Preview" width={400} height={250}
                                       className="rounded-lg shadow border border-gray-200"/>
                            </div>
                        )}
                    </div>

                    <div className="items-center gap-4 mt-4">
                        <label className="block font-semibold mb-1">Thêm ảnh vào bài viết:</label>
                        <label
                            htmlFor="edit-content-image-upload"
                            className="cursor-pointer inline-block bg-[#FFB74D] text-white px-4 py-2 rounded-md hover:bg-[#FFA726] transition-colors"
                        >
                            Tải ảnh lên
                        </label>
                        <input
                            id="edit-content-image-upload"
                            className="hidden w-full max-w-full text-sm text-white px-3 py-2 rounded-full hover:bg-[#FFA552] file:cursor-pointer file:border-0 file:bg-[#FFA552] file:text-white file:px-4 file:py-2"
                            type="file"
                            accept="image/*"
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
                                e.target.value = '';
                            }}
                        />

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
                                            editor.chain().focus().setImage({
                                                src: imageUrl,
                                                alt: originalFileName
                                            }).run();
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
                                <div
                                    className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 bg-[#FFF6C7] border-b border-[#FFA552] rounded-t-lg">
                                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active font-bold' : ''} title="Bold"><span className="font-bold text-xl">B</span></button>
                                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active font-bold' : ''} title="Italic"><span className="italic text-xl">I</span></button>
                                    <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active font-bold' : ''} title="Underline"><span className="underline text-xl">U</span></button>
                                    <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FACBCC' }).run()} className={editor.isActive('highlight', { color: '#FACBCC' }) ? 'is-active bg-[#FACBCC]' : ''} title="Highlight">Highlight</button>
                                </div>
                                <EditorContent editor={editor} className="min-h-[200px] p-4 focus:outline-none"/>
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

                    <div className="text-center mt-6">
                        <button onClick={handleValidateAndConfirm} className="bg-[#FFA552] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF9333] transition">
                            Cập nhật bài viết
                        </button>
                    </div>
                </div>

                <Modal opened={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title="Xác nhận cập nhật?" centered size="md" withCloseButton={false}>
                    <p className="text-center text-sm text-[#666]">Bạn có chắc chắn muốn lưu lại những thay đổi này không?</p>
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