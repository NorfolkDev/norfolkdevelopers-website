const path = require("path");
const rehypePrism = require("@mapbox/rehype-prism");

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],

  serverRuntimeConfig: {
    PROJECT_ROOT: path.join(__dirname, "src"),
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
        {
          loader: "./src/lib/frontmatter/loader",
        },
      ],
    });

    if (!options.isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};

module.exports = nextConfig;
