'use client';

import { useState, useEffect } from 'react';

interface AuthInfo {
    name: string | null;
    username: string | null;
    role: string | undefined;
    id: string | undefined;
    isAuthenticated: boolean;
    // isLoading: boolean;
}

interface User {
    id?: string;
    name?: string;
    username?: string;
    role?: string;
}

export function useAuth(): AuthInfo {
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        name: null,
        username: null,
        role: undefined,
        id: undefined,
        isAuthenticated: false,
        // isLoading: true,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const res = await fetch('/api-v1/auth-self/me');

                if (res.ok && isMounted) {
                    const user: User = await res.json();
                    setAuthInfo({
                        name: user.name || null,
                        username: user.username || null,
                        role: user.role,
                        id: user.id,
                        isAuthenticated: true,
                        // isLoading: false,
                    });
                } else {
                    if (isMounted) {
                        setAuthInfo({
                            name: null,
                            username: null,
                            role: undefined,
                            id: undefined,
                            isAuthenticated: false,
                            // isLoading: false,
                        });
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                if (isMounted) {
                    setAuthInfo({
                        name: null,
                        username: null,
                        role: undefined,
                        id: undefined,
                        isAuthenticated: false,
                        // isLoading: false,
                    });
                }
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, []);

    return authInfo;
}