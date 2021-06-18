import { slugify, deSlugify } from "../src/slugify";

describe("blog-fns", () => {
  it("turn a string into a slug", () => {
    const testString = "test slug three space";
    const expected = "test-slug-three-space";
    const actual = slugify(testString);
    expect(actual).toEqual(expected);
  });

  it("turn a slug into a string with spaces", () => {
    const testSlug = "test-slug-three-hyphen";
    const expected = "test slug three hyphen";
    const actual = deSlugify(testSlug);
    expect(actual).toEqual(expected);
  });
});
