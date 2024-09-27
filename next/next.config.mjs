/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // useEffectとかが2回発火する。
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'example.com', // ここに許可する画像のホスト名を記述
          },
          {
            protocol: 'http',
            hostname: 'books.google.com', // ここに許可する画像のホスト名を記述
          },
        ],
      },
  };
  
  export default nextConfig;