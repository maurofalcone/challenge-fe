import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.jsx",
      },
    },
  },
  webpack(config) {
    config.module.rules = config.module.rules.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule: any) => !(rule.test && rule.test.toString().includes("svg"))
    );
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
          },
        },
      ],
    });

    return config;
  },

  images: {
    domains: ["dummyjson.com"],
  },
};

export default nextConfig;
