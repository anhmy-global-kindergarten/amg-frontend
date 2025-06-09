'use client';

import React from 'react';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import Image from 'next/image'; // Dùng Next/Image để tối ưu ảnh

interface RenderHTMLContentProps {
    content: string;
}

export default function RenderHTMLContent({ content }: RenderHTMLContentProps) {
    if (!content) return null;

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            // Kiểm tra nếu node là một element (không phải text, comment)
            if (domNode instanceof Element && domNode.attribs) {

                // --- XỬ LÝ THẺ IMG ---
                if (domNode.name === 'img') {
                    const { src, alt, width, height } = domNode.attribs;

                    // Nếu không có src, không render gì cả
                    if (!src) return <></>;

                    // Sửa lại đường dẫn ảnh tương tự như bạn đã làm
                    const imageUrl = src.startsWith('http')
                        ? src
                        : `${BASE_URL}/${src.replace('./', '')}`;

                    // Dùng Next/Image để tối ưu, hoặc thẻ <img> thường
                    // Lưu ý: Next/Image cần width và height
                    const imageWidth = width ? parseInt(width, 10) : 800; // Giá trị mặc định
                    const imageHeight = height ? parseInt(height, 10) : 450; // Giá trị mặc định

                    return (
                        <Image
                            src={imageUrl}
                            alt={alt || 'Image from content'}
                            width={imageWidth}
                            height={imageHeight}
                            className="my-4 rounded-lg shadow-md" // Thêm style cho đẹp
                            style={{ width: '100%', height: 'auto' }} // Giữ tỷ lệ ảnh
                        />
                    );
                }

                // --- BẠN CÓ THỂ XỬ LÝ CÁC THẺ KHÁC Ở ĐÂY ---
                // Ví dụ: thêm class cho thẻ <p>
                // if (domNode.name === 'p') {
                //     return <p className="mb-4">{domToReact(domNode.children, options)}</p>;
                // }
            }
        },
    };

    return <>{parse(content, options)}</>;
}