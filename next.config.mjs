import createMDX from '@next/mdx';
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    cssChunking: 'loose',
  },
  // 정적일떄 사용하면 좋음
  reactMaxHeadersLength: 1000,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {},
});

export default withMDX(nextConfig);
