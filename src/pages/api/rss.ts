import { NextApiRequest, NextApiResponse } from "next";
import { FrontMatter } from "../../lib/blog-engine";
import siteConfig from "../../../site.config";

export default function rssApiRoute(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const hostname = req.headers.host;
  const { getPosts } = require("../../lib/blog-engine");
  res.setHeader("Content-Type", "text/xml");
  res.write(`<?xml version="1.0" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.siteName} | RSS</title>
    <atom:link href="https://${hostname}/rss" rel="self" type="application/rss+xml"/>
    <link>https://${hostname}/words</link>
    <description>${siteConfig.description}</description>
    <language>en</language>
${getPosts()
  .map(
    (post: FrontMatter) => `      <item>
      <title>${post.title}</title>
      <link>https://${hostname}${post.path}</link>
      <guid>https://${hostname}${post.path}</guid>
      <pubDate>${post.date}</pubDate>
      <description><![CDATA[
        ${post.excerpt || post.body}
        <a href="https://${hostname}${post.path}">Read more</a>
      ]]></description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`);
  res.end();
}
