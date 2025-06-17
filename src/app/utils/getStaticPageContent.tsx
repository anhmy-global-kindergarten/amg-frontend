'use client';
// * eslint-disable */
import React from 'react';
import parse, { HTMLReactParserOptions, Element, attributesToProps, domToReact } from 'html-react-parser';
import { ImageWithStyle } from '@/app/hooks/usePostById';

interface RenderHTMLContentProps {
    content: string;
    images?: ImageWithStyle[];
}

export default function RenderStaticHTMLContent({ content , images = [] }: RenderHTMLContentProps) {
    if (!content) return null;

    // Bỏ imageStyleMap nếu không dùng
    const imageStyleMap = new Map<string, string>();
    images?.forEach(img => {
        if (img && img.url && img.style) {
            imageStyleMap.set(img.url, img.style);
        }
    });

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {
                const props = attributesToProps(domNode.attribs);

                // Xử lý thẻ <img> như cũ
                if (domNode.name === 'img') {
                    const src = props.src as string | undefined;
                    if (!src) return <></>;

                    const inlineStyle = props.style as React.CSSProperties | undefined;
                    const altText = String(props.alt || "content image");
                    return (
                        <img
                            src={src}
                            alt={altText}
                            style={inlineStyle}
                            className="my-4"
                        />
                    );
                }

                if (domNode.name === 'highlighted') {
                    return (
                        <span style={{ color: '#FFD668' }} className="font-semibold">
                            {domToReact(domNode.children as never, options)}
                        </span>
                    );
                }

                if (domNode.name === 'figcaption') {
                    return (
                        <figcaption className="text-center text-sm text-gray-500 mt-2 mb-2">
                            {domToReact(domNode.children as never, options)}
                        </figcaption>
                    );
                }
            }
            return undefined;
        },
    };

    return (
        <div className="prose prose-lg max-w-none text-black">
            {parse(content, options)}
        </div>
    );
}