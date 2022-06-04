/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
      "media.istockphoto.com",
      "images.unsplash.com",
      "upload.wikimedia.org",
      "source.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
