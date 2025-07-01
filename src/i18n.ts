/* eslint-disable */
import {getRequestConfig} from 'next-intl/server';
export const locales = ['en', 'vi'];
export default getRequestConfig(async (params: { locale?: string }) => {
    if (!locales.includes(params as any)) {
        // Bạn có thể xử lý lỗi ở đây, ví dụ redirect về ngôn ngữ mặc định
        // Hoặc đơn giản là để Next.js hiển thị trang 404
    }

    return {
        locale: params.locale || 'vi',
        messages: (await import(`./messages/${params.locale}.json`)).default
    };
});