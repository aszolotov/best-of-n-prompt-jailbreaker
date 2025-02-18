/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "/prompt-jailbreaker/",
  images: {
    unoptimized: true,
  },
  basePath: "/prompt-jailbreaker",
};

export default nextConfig;
