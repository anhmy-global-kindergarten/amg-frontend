// hooks/useAuth.ts
'use client'; // Đảm bảo hook này chỉ chạy ở phía client

import { useState, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu cho thông tin người dùng trả về
// Bạn có thể mở rộng interface này nếu cần thêm thông tin
interface AuthInfo {
    name: string | null;
    role: string | null;
    // id: string | null;
    // isLoaded: boolean; // Thêm trạng thái để biết đã load xong chưa
}

// Định nghĩa kiểu dữ liệu của đối tượng user lưu trong localStorage
// Điều này giúp code an toàn hơn
interface StoredUser {
    user?: {
        name?: string;
        role?: string;
    };
    name?: string;
    role?: string;
}

export function useAuth(): AuthInfo {
    // Khởi tạo state ban đầu là null
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        name: null,
        role: null,
        // isLoaded: false,
    });

    useEffect(() => {
        // Biến để tránh set state trên component đã unmount
        let isMounted = true;

        try {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                const parsed: StoredUser = JSON.parse(storedUser);

                // Trích xuất thông tin, ưu tiên cấu trúc lồng nhau
                const name = parsed?.user?.name || parsed?.name || null;
                const role = parsed?.user?.role || parsed?.role || null;

                // Chỉ set state nếu component vẫn còn mounted
                if (isMounted) {
                    setAuthInfo({ name, role });
                }
            }
        } catch (error) {
            console.error("Lỗi đọc user từ localStorage:", error);
            // Có thể set state lỗi ở đây nếu cần
        }

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần sau khi component mount

    return authInfo;
}