// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // Một danh sách tất cả các ngôn ngữ được hỗ trợ
    locales: ['vi', 'en'],

    // Được sử dụng khi không có ngôn ngữ nào khớp
    defaultLocale: 'vi',

    // Tùy chọn: Không thêm tiền tố ngôn ngữ cho defaultLocale
    // Ví dụ: /about -> /vi/about
    // Nếu đặt là true, /about sẽ không bị chuyển hướng
    localePrefix: 'as-needed' // Hoặc 'always' | 'never'
});

export const config = {
    // Chỉ chạy middleware cho các path không phải là file tĩnh hoặc API
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};