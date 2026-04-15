import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/LoveStoryTreasure",
  assetPrefix: "/LoveStoryTreasure/",
};

export default nextConfig;