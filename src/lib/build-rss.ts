import * as fs from "fs";
import path from "path";
import RSS from "rss";
import { getPosts } from "./blog-engine";
import siteConfig from "../../site.config";

// const fs = require("fs");
// const path = require("path");
// const RSS = require("rss");
// const getPosts = require("./blog-engine").getPosts;

const previewItems = getPosts(true);

function generate(outputPath: string) {
  const feed = new RSS({
    title: "Next.js Blog",
    site_url: siteConfig.rootUrl,
    feed_url: siteConfig.rootUrl + "/feed.xml",
  });

  previewItems.map((post) => {
    feed.item({
      title: post.title || "",
      url: siteConfig.rootUrl + post.path,
      date: post.date,
      description: post.excerpt || post.body || "",
      // custom_elements: [].concat(
      //   post.author.map((author) => ({ author: [{ name: author.name }] }))
      // ),
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(outputPath, "feed.xml"), rss);
}

// generate("./public/static/");
export default generate;
