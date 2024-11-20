/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'xwhyozzrqwi1qkiy.public.blob.vercel-storage.com',
          port: '',
        },
      ],
    },
  };

export default nextConfig;
