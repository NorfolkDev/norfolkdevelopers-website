const path = require("path");
const rehypePrism = require("@mapbox/rehype-prism");

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", /* "mdx",  "md" */],

  serverRuntimeConfig: {
    PROJECT_ROOT: path.join(__dirname, 'src'),
  },
};

module.exports = nextConfig;
