'use client';

import { useState, useEffect } from 'react';

interface AuthInfo {
    name: string | null;
    role: string | undefined;
    id: string | undefined;
}

interface StoredUser {
    user?: {
        id?: string;
        name?: string;
        role?: string;
    };
    id?: string;
    name?: string;
    role?: string;
}

export function useAuth(): AuthInfo {
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        name: null,
        role: undefined,
        id: undefined,
    });

    useEffect(() => {
        let isMounted = true;

        try {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                const parsed: StoredUser = JSON.parse(storedUser);

                const name = parsed?.user?.name || parsed?.name || null;
                const role = parsed?.user?.role || parsed?.role || undefined;
                const id = parsed?.user?.id || parsed?.id || undefined;
                if (isMounted) {
                    setAuthInfo({ name, role, id });
                }
            }
        } catch (error) {
            console.error("Lỗi đọc user từ localStorage:", error);
        }

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []);

    return authInfo;
}