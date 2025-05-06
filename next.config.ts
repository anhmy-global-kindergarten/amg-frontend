import type { NextConfig } from "next";
import { i18nConfig } from './next-i18next.config.mjs'

const nextConfig: NextConfig = {
  /* config options here */
    ii18n: i18nConfig.i18n,
};

export default nextConfig;
