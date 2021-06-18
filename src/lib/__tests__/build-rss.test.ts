import fs from "fs";
import { generateRSS } from "../src/build-rss";

const testProperties = {
  name: "Test Site",
  description: "Test description",
  url: "http://localhost:3000",
  filename: "feed.xml",
  outputLocation: "./",
  postTitle: "First post",
};

describe("build-rss-fns", () => {
  it("should build an rss feed from posts from getPosts", () => {
    const generatedRSS = generateRSS({
      outputPath: testProperties.outputLocation,
      rootUrl: testProperties.url,
      siteName: testProperties.name,
      description: testProperties.description,
      rssFilename: testProperties.filename,
    });
    expect(generatedRSS).toBe(true);
    const file = fs.readFileSync(
      `${testProperties.outputLocation}${testProperties.filename}`,
      "utf-8"
    );
    expect(file).toContain(testProperties.name);
    expect(file).toContain(testProperties.description);
    expect(file).toContain(testProperties.url);
    expect(file).toContain(testProperties.postTitle);
  });

  afterAll(() => {
    fs.unlinkSync(`${testProperties.outputLocation}${testProperties.filename}`);
  });
});
