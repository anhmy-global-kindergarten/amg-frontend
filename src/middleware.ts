import createMiddleware from 'next-intl/middleware';
import {locales} from '@/config';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    // DÒNG DEBUG: In ra đường dẫn mỗi khi middleware chạy
    console.log('Middleware is running for path src:', request.nextUrl.pathname);

    const handleI18nRouting = createMiddleware({
        locales: locales,
        defaultLocale: 'vi'
    });

    return handleI18nRouting(request);
}

export const config = {
    matcher: ["/", "/(vi|en)/:path*"],
};