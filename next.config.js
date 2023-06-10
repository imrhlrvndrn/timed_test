/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
};

module.exports = {
    ...nextConfig,
    async rewrites() {
        return [
            {
                source: '/api',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
            },
        ];
    },
};
