'use client';

export default function formatDateDisplay(dateStr: string) {
    if (!dateStr) {
        return { day: '??', month: '??' };
    }

    try {
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.getMonth() + 1;

        if (isNaN(day) || isNaN(month)) {
            console.error("Invalid date string provided:", dateStr);
            return { day: '??', month: '??' };
        }

        return { day, month };
    } catch (error) {
        console.error("Error parsing date string:", dateStr, error);
        return { day: '??', month: '??' };
    }
}