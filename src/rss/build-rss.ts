import { generateRSS } from "@static-fns/blog";
import siteConfig from "../../site.config";

try {
  generateRSS({
    outputPath: "./public",
    rootUrl: siteConfig.rootUrl,
    siteName: siteConfig.siteName,
    description: siteConfig.description,
    rssFilename: "feed.xml",
  });
} catch (e) {
  console.error(e);
}
