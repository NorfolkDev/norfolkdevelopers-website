const path = require("path");

const nextConfig = {
  pageExtensions: ["js", "jsx", "tsx", "mdx", "md"],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      use: [
        options.defaultLoaders.babel,
        "@mdx-js/loader",
        path.join(__dirname, "./src/lib/frontmatter-loader")
      ]
    });

    return config;
  }
};

module.exports = nextConfig;
