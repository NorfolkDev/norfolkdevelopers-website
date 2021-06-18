import fs from "fs";
import path from "path";
import RSS from "rss";
import showdown from "showdown";
import { getPosts } from "./blog-fns";

type RSSOptions = {
  outputPath: string;
  rootUrl: string;
  siteName?: string;
  rssFilename?: string;
  description?: string;
};

const DEFAULT_FILENAME = "rss.xml";

export function generateRSS(options: RSSOptions) {
  const converter = new showdown.Converter();

  const previewItems = getPosts({ cache: true });
  const feed = new RSS({
    title: options.siteName || "RSS Feed",
    site_url: options.rootUrl,
    feed_url: `${options.rootUrl}/${options.rssFilename || DEFAULT_FILENAME}`,
    description: options.description || "",
    generator: "fns",
  });

  previewItems.map((post: any) => {
    feed.item({
      title: post.title || "",
      url: options.rootUrl + post.path,
      date: post.date,
      description: converter.makeHtml(post.body) || post.excerpt,
      // custom_elements: [].concat(
      //   post.author.map((author) => ({ author: [{ name: author.name }] }))
      // ),
    });
  });

  const rss = feed.xml({ indent: true });
  try {
    fs.writeFileSync(
      path.join(options.outputPath, options.rssFilename || DEFAULT_FILENAME),
      rss
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
