import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx"],
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            { protocol: "https", hostname: "**" },
            { protocol: "http", hostname: "**" },
        ],
    },
};

export default nextConfig;
