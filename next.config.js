const path = require("path");
const rehypePrism = require("@mapbox/rehype-prism");

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],

  serverRuntimeConfig: {
    PROJECT_ROOT: path.join(__dirname, 'src'),
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
          loader: "@static-fns/loader",
        },
        createLoader(function (src) {
          const content = [
            'import Post from "@/components/Post"',
            'export { getStaticProps } from "@/getStaticProps"',
            src,
            'export default (props) => <Post meta={meta} {...props} />',
          ].join('\n')

          if (content.includes('<!--​more-->')) {
            return this.callback(null, content.split('<!--​more-->').join('\n'))
          }

          return this.callback(null, content.replace(/<!--​excerpt-->.*<!--\/excerpt-->/s, ''))
        }),
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
