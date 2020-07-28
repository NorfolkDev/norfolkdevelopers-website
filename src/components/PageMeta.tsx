import { NextSeo } from "next-seo";
import siteConfig from "site.config";

type Props = {
  title?: string;
  description?: string;
  image?: string;
};

export default function PageMeta(props: Props) {
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
