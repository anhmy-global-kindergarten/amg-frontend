'use client';
/* eslint-disable */
import React, {JSX} from 'react';
import parse, {HTMLReactParserOptions, Element, attributesToProps, domToReact, DOMNode} from 'html-react-parser';
import { ImageWithStyle } from '@/app/hooks/usePostById';

interface RenderHTMLContentProps {
    content: string;
    images?: ImageWithStyle[];
}

function hasLeadingListItemMarkerInText(node: DOMNode | null | undefined): boolean {
    console.log('hasLeadingListItemMarker', node);
    if (node && node.type === 'text') {
        const text = node.data.trimStart();
        console.log('hasLeadingListItemMarker', text);
        return /^\s*(\d+\.|[a-zA-Z]\.|[ivxlcdm]+\.|-|\*|•)\s/.test(text);
    }
    return false;
}

function getDeepTextContent(nodes: DOMNode[] | undefined): string {
    if (!nodes) return '';
    let text = '';
    for (const node of nodes) {
        if (node.type === 'text') {
            text += node.data;
        } else if (node.type === 'tag' && node.children) {
            text += getDeepTextContent(node.children as DOMNode[]);
        }
    }
    return text;
}

export default function RenderStaticHTMLContent({ content , images = [] }: RenderHTMLContentProps) {
    if (!content) return null;

    const imageStyleMap = new Map<string, string>();
    images?.forEach(img => {
        if (img && img.url && img.style) {
            imageStyleMap.set(img.url, img.style);
        }
    });

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {
                const elementNode = domNode as Element;
                const props = attributesToProps(domNode.attribs);
                const children = domNode.children as DOMNode[] | undefined;

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
                if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(domNode.name)) {
                    const HeadingTag = domNode.name as keyof JSX.IntrinsicElements;
                    return (
                        <HeadingTag
                            className={`${props.className || ''} mb-6 font-bold `}
                        >
                            {domToReact(children as any, options)}
                        </HeadingTag>
                    );
                }

                if (elementNode.name === 'ol' || elementNode.name === 'ul') {
                    let hasManualMarkers = false;
                    if (children && children.length > 0) {
                        const firstLiChild = children.find(child => child.type === 'tag' && child.name === 'li') as Element | undefined;

                        if (firstLiChild) {
                            const liTextContent = getDeepTextContent(firstLiChild.children as DOMNode[]);

                            if (/^\s*(\d+\.|[a-zA-Z]\.|[ivxlcdm]+\.|-|\*|•)\s/.test(liTextContent.trimStart())) {
                                hasManualMarkers = true;
                            }
                        }
                    }

                    let listClasses = `${props.className || ''} space-y-2`;
                    if (hasManualMarkers) {
                        listClasses += ' list-none pl-0';
                    } else {
                        if (elementNode.name === 'ol') listClasses += ' list-decimal list-inside';
                        else listClasses += ' list-disc list-inside';
                    }

                    const ListTag = elementNode.name as keyof JSX.IntrinsicElements;
                    return (
                        <ListTag {...props} className={listClasses.trim()}>
                            {children && domToReact(children, options)}
                        </ListTag>
                    );
                }

                if (domNode.name === 'li') {
                    return (
                        <li {...props}>
                            {domToReact(children as any, options)}
                        </li>
                    );
                }
            }
            return undefined;
        },
    };

    return (
        <div className="font-mali prose prose-lg max-w-none text-black text-justify">
            {parse(content, options)}
        </div>
    );
}