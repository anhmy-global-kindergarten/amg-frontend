import type { NextConfig } from "next";
import { i18nConfig } from './next-i18next.config.mjs'

const nextConfig: NextConfig = {
    reactStrictMode: false,
  /* config options here */
    i18n: i18nConfig.i18n,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        allowedDevOrigins: ["*.ngrok-free.app"],
    },

    async rewrites() {
        return [
            {
                // Bất kỳ request nào từ frontend bắt đầu bằng /api/...
                source: '/api-v1/:path*',
                // Sẽ được chuyển tiếp đến backend với tiền tố /amg/v1/ được thêm vào
                destination: 'http://localhost:3030/amg/v1/:path*', // Thay 8080 bằng port backend của bạn
            },
            // --- THÊM QUY TẮC MỚI CHO FILE TĨNH ---
            {
                // Giả sử các file ảnh của bạn được backend phục vụ qua đường dẫn /uploads/
                source: '/uploads/:path*',
                destination: 'http://localhost:3030/uploads/:path*', // Proxy đến thư mục uploads của backend
            }
        ]
    },
};

export default nextConfig;
