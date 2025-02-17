/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/prompt-jailbreaker/" : "",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/prompt-jailbreaker" : "",
};

export default nextConfig;
