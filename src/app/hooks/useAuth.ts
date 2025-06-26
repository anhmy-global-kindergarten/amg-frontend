'use client';

import { useState, useEffect } from 'react';

interface AuthInfo {
    name: string | null;
    role: string | null;
    id: string | null;
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
        role: null,
        id: null,
    });

    useEffect(() => {
        let isMounted = true;

        try {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                const parsed: StoredUser = JSON.parse(storedUser);

                const name = parsed?.user?.name || parsed?.name || null;
                const role = parsed?.user?.role || parsed?.role || null;
                const id = parsed?.user?.id || parsed?.id || null;
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