// pages/api/auth/[...nextauth].ts
/* eslint-disable */
import NextAuth, {Session, User} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {JWT} from "next-auth/jwt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };

                // Fake login: hardcoded admin
                if (email === 'admin@123' && password === 'admin') {
                    return { id: '1', name: 'Admin', email: 'admin@123', role: 'admin' };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt' as const,
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token?.role) session.user.role = token.role as string;
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
};

export default NextAuth(authOptions);
