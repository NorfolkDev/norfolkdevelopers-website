const path = require("path");
const rehypePrism = require("@mapbox/rehype-prism");

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
  experimental: {
    modern: true,
    async rewrites() {
      return [{ source: "/rss", destination: "/api/rss" }];
    },
    catchAllRouting: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            rehypePlugins: [rehypePrism],
          },
        },
        path.join(__dirname, "./src/lib/frontmatter-loader"),
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
