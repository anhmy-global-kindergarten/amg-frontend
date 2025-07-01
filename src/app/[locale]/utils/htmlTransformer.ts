// utils/htmlTransformers.ts

export function markToHighlighted(htmlString: string): string {
    if (!htmlString) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const marks = doc.querySelectorAll('mark');
    marks.forEach(markElement => {
        const dataColor = markElement.getAttribute('data-color');
        const style = markElement.getAttribute('style');

        const isOurHighlight = (dataColor && dataColor.toUpperCase() === '#FFD668') ||
            (style && style.toLowerCase().includes('background-color: #ffd668'));

        if (isOurHighlight) {
            const highlightedElement = doc.createElement('highlighted');
            while (markElement.firstChild) {
                highlightedElement.appendChild(markElement.firstChild);
            }
            markElement.parentNode?.replaceChild(highlightedElement, markElement);
        }
    });
    return doc.body.innerHTML;
}

export function highlightedToMark(htmlString: string): string {
    if (!htmlString) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const highlightedElements = doc.querySelectorAll('highlighted');
    highlightedElements.forEach(highlightedEl => {
        const markElement = doc.createElement('mark');
        markElement.setAttribute('data-color', '#FFD668');

        while (highlightedEl.firstChild) {
            markElement.appendChild(highlightedEl.firstChild);
        }
        highlightedEl.parentNode?.replaceChild(markElement, highlightedEl);
    });
    return doc.body.innerHTML;
}