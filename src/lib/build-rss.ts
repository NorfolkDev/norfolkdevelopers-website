import fs from "fs";
import path from "path";
import RSS from "rss";
import { getPosts } from "./blog-engine";
import siteConfig from "../../site.config";

const previewItems = getPosts(true);

function generate(outputPath: string) {
  const feed = new RSS({
    title: siteConfig.siteName,
    site_url: siteConfig.rootUrl,
    feed_url: siteConfig.rootUrl + "/rss.xml",
  });

  previewItems.map((post: any) => {
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

generate("./public");
