// @ts-check

// @ts-ignore
import next_pwa from "next-pwa";

const withPWA = next_pwa({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
})

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
    return withPWA(config);
}

export default defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true
    },
});
