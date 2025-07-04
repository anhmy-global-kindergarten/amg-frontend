'use client';

import React from 'react';
import parse, {HTMLReactParserOptions, Element, attributesToProps} from 'html-react-parser';
import { ImageWithStyle } from '@/app/hooks/usePostById';

interface RenderHTMLContentProps {
    content: string;
    images?: ImageWithStyle[];
}

export default function RenderHTMLContent({ content, images = [] }: RenderHTMLContentProps) {
    if (!content) return null;

    const imageStyleMap = new Map<string, string>();
    images?.forEach(img => {
        if (img && img.url && img.style) {
            imageStyleMap.set(img.url, img.style);
        }
    });

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.name === 'img') {
                const props = attributesToProps(domNode.attribs);

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
        },
    };

    return <div className="prose prose-lg max-w-none">
        {parse(content, options)}
    </div>
}