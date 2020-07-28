import { NextSeo, NextSeoProps } from "next-seo";
import siteConfig from "site.config";

export default function PageMeta(props: NextSeoProps) {
  const title = props.title
    ? `${props.title} | ${ siteConfig.siteSEOName }`
    : `${ siteConfig.siteSEOName } | ${siteConfig.shortDescription}`;
  const description = props.description || siteConfig.description;

  return (
    <NextSeo
      openGraph={{
        title: props.title
          ? props.title
          : title,
        description,
        site_name: siteConfig.siteSEOName,
        images: props.image
          ? [ { url: props.image } ]
          : [ { url: `${siteConfig.rootUrl}/static/images/default-open-graph.jpg` } ],
      }}
      twitter={{
        handle: "@NorfolkDev",
        site: "@NorfolkDev",
        cardType: "summary_large_image",
      }}
      {...props}
      title={title}
      description={description}
    />
  );
}
