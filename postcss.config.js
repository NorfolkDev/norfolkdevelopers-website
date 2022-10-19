const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "./src/components/**/*.js",
      "./src/pages/**/*.js",
      "./src/components/**/*.tsx",
      "./src/pages/**/*.tsx",
      "./src/pages/**/*.mdx",
      "./src/pages/**/*.md",
      "./src/css/**/*.css",
      "./src/css/**/*.css",
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];
module.exports = {
  plugins: [
    "postcss-import",
    // @TODO: Fix TailwindCSS nesting, remove warning with the following plugin - breaks build!?
    // "tailwindcss/nesting",
    "tailwindcss",
    "postcss-nested",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
