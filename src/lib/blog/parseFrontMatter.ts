const matter = require("gray-matter");
import cleanse from "./remove-markdown";

// TODO: Allow excerpt length to be configurable
const EXCERPT_LENGTH = 280;

function parseFrontMatter(file) {
  const { content, data, excerpt } = matter(file, { excerpt: true });

  // TODO: validate date for frontmatter and give a nice error message

  if (typeof data.tags === "string") {
    data.tags = data.tags.split(",").map((tag) => tag.trim());
  }

  if (typeof data.author === "string") {
    data.author = data.author.split(",").map((author) => author.trim());
  }

  if (!data.excerpt && excerpt) {
    data.excerpt = excerpt.replace(/\n/g, "");
  } else if (!data.excerpt && !excerpt) {
    data.excerpt = cleanse(content)
      .replace(/\n\n/g, " ")
      .replace(/\n/g, "")
      .substr(0, EXCERPT_LENGTH);
    data.excerpt += "...";
  }

  return {
    data,
    content,
  };
}

// module.exports = parseFrontMatter;
export default parseFrontMatter;
