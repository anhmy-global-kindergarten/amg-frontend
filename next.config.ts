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
                hostname: 'localhost',
                port: '3030',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
