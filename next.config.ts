import createMDX from "@next/mdx";
import type { NextConfig } from "next";



const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },

};

const withMDX = createMDX({
    options: {
        remarkPlugins: ["remark-gfm", "remark-frontmatter"],
        rehypePlugins: [
            "rehype-slug",
            [
                "rehype-pretty-code",
                {
                    theme: {
                        dark: "github-dark",
                        light: "github-light",
                    },
                    keepBackground: false,
                },
            ],
            [
                "rehype-autolink-headings",
                {
                    properties: {
                        className: ["anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
    },
});

export default withMDX(nextConfig);