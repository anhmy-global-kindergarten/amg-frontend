import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // Một danh sách tất cả các ngôn ngữ được hỗ trợ bởi trang web của bạn
    locales: ['en', 'vi'],

    // Ngôn ngữ mặc định sẽ được sử dụng khi không có ngôn ngữ nào khớp
    // ví dụ: khi người dùng truy cập `/`
    defaultLocale: 'vi'
});

export const config = {
    // Chỉ chạy middleware trên các đường dẫn cần dịch
    // Bỏ qua các đường dẫn không cần thiết như /api, /_next/static, ...
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};