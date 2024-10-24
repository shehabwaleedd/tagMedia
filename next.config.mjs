/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['res.cloudinary.com', 'images.prismic.io'],
    }

};

export default nextConfig;
