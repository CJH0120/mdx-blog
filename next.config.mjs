import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  optimizeFonts: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  experimental: {
    cssChunking: 'loose',
    mdxRs: true,
  },
  // // 정적일떄 사용하면 좋음
  reactMaxHeadersLength: 1000,

  images: {
    deviceSizes: [666],
    imageSizes: [240, 666, 700],
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
