"use client";

import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import {ImageResize} from "tiptap-extension-resize-image";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
        ImageResize,
      ImageExtension.configure({
        inline: false,  // Ảnh hiển thị block (dễ căn chỉnh)
        allowBase64: true,  // Cho phép dán ảnh dạng base64 (nhanh, test)
      }),
    ],
    content: "<p>Viết nội dung ở đây...</p>",
      editorProps: {
          attributes: {
              class: "min-h-[200px] rounded-lg border border-[#FFA552] p-4 focus:outline-none",
          },
      },
  });

  // Thêm ảnh từ file input
  const addImage = useCallback(
    (file: File) => {
      if (!editor) return;

      const reader = new FileReader();
      reader.onload = () => {
        // Thêm ảnh dưới dạng base64 (hoặc upload lên server rồi lấy url thực)
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
      };
      reader.readAsDataURL(file);
    },
    [editor]
  );

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) addImage(file);
            e.target.value = ""; // reset input để có thể chọn lại file giống nhau
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
