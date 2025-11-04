import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ["three"],
  images:{
    remotePatterns:[new URL('https://upload.wikimedia.org/**')]
  }
};



const withMDX = createMDX({})
export default withMDX(nextConfig);
