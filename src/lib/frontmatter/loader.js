const stringifyObject = require("stringify-object");
const parseFrontMatter = require("./parseFrontMatter");

module.exports = async function (src) {
  const callback = this.async();
  const { content, data } = parseFrontMatter(src);
  const code = `export const frontMatter = ${stringifyObject(data)}
${content}`;

  return callback(null, code);
};
