
/* eslint-disable */

import Youtube from "@tiptap/extension-youtube";
import {PasteRule} from "@tiptap/core";
import ImageExtension from "@tiptap/extension-image";
import {Paragraph} from "@tiptap/extension-paragraph";
import {Heading} from "@tiptap/extension-heading";

export const youtubeRegex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([\w-]{11})(?:\S+)?/g;
export const CustomYoutube = Youtube.extend({
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

export const CustomImage = ImageExtension.extend({
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
export const CustomParagraph = Paragraph.extend({
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
export const CustomHeading = Heading.extend({
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