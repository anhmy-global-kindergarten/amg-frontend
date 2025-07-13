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
        inline: false,
        allowBase64: true,
      }),
    ],
    content: "<p>Viết nội dung ở đây...</p>",
      editorProps: {
          attributes: {
              class: "min-h-[200px] rounded-lg border border-[#FFA552] p-4 focus:outline-none",
          },
      },
  });

  const addImage = useCallback(
    (file: File) => {
      if (!editor) return;

      const reader = new FileReader();
      reader.onload = () => {
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
            e.target.value = "";
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
