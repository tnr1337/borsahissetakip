/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#0a0a0a',
                    card: '#171717',
                    border: '#262626'
                },
                brand: {
                    primary: '#3b82f6',
                    accent: '#8b5cf6'
                }
            }
        },
    },
    plugins: [],
}
