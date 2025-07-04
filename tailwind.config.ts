import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'cadena': ['Cadena', 'sans-serif'],
                'mali': ['Mali', 'sans-serif'],
                'mali-bold': ['Mali-Bold', 'sans-serif'],
                'mali-medium': ['Mali-Medium', 'sans-serif'],
                'mali-semibold': ['Mali-Semibold', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
export default config