import React from "react";

function stripHtml(html: string): string {
    if (typeof window === "undefined") return html;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}

function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}

export default function LineClampContent({ content }: { content: string }) {
    const text = stripHtml(content);
    const shortText = truncateText(text, 84);

    return (
        <p className="font-mali text-sm text-black line-clamp-3">
            {shortText}
        </p>
    );
}
