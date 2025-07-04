import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    /* config options here */
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
    // experimental: {
    //     allowedDevOrigins: ["*.ngrok-free.app"],
    // },

    async rewrites() {
        return [
            {
                // Bất kỳ request nào từ frontend bắt đầu bằng /api/...
                source: '/api-v1/:path*',
                // Sẽ được chuyển tiếp đến backend với tiền tố /amg/v1/ được thêm vào
                destination: 'http://localhost:3030/amg/v1/:path*', // Thay 3030 bằng port backend của bạn
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



export default withNextIntl(nextConfig);