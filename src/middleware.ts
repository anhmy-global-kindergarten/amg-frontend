import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error('JWT_SECRET environment variable is not set!');
        return new NextResponse('Internal Server Error: JWT secret is not configured.', { status: 500 });
    }

    const secret = new TextEncoder().encode(jwtSecret);

    const sessionToken = request.cookies.get('session_token')?.value;
    const { pathname } = request.nextUrl;

    if (!sessionToken) {
        return NextResponse.redirect(new URL('/auth-required', request.url));
    }

    try {
        const { payload } = await jwtVerify(sessionToken, secret);
        const userRole = payload.role as string;

        if (pathname.startsWith('/admin-dashboard') || pathname.startsWith('/static-post/create') || pathname.startsWith('/static-post/edit')) {
            if (userRole !== 'admin') {
                console.log(`Access to admin-dashboard denied for role: ${userRole}. Redirecting...`);
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }
        }

        if (pathname.startsWith('/post/create') || pathname.startsWith('/post/edit')) {
            if (userRole === 'parent') {
                console.log(`Access to create/edit post denied for role: ${userRole}. Redirecting...`);
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }
        }

        console.log(`Access granted for role: ${userRole} to path: ${pathname}`);
        return NextResponse.next();

    } catch (err) {
        console.error('Invalid token, redirecting to unauthorized:', err);
        const loginUrl = new URL('/auth-required', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('session_token');
        return response;
    }
}

export const config = {
    matcher: [
        '/admin-dashboard/:path*',
        '/post/create/:path*',
        '/post/edit/:path*',
        '/static-post/create/:path*',
        '/static-post/edit/:path*',
    ],
};