import { NextSeo, NextSeoProps } from "next-seo";
import siteConfig from "site.config";

export default function PageMeta(props: NextSeoProps) {
  const formattedTitle = `${props.title ? `${props.title} | ` : ""} ${
    siteConfig.siteSEOName
  } | ${siteConfig.shortDescription}`;
  const description = props.description || siteConfig.description;

  return (
    <NextSeo
      openGraph={{
        title: formattedTitle,
        description,
        site_name: siteConfig.siteSEOName,
        images: props.openGraph?.images || [],
      }}
      twitter={{
        handle: "@shaunchurch",
        site: "@shaunchurch",
        cardType: "summary_large_image",
      }}
      {...props}
      title={formattedTitle}
      description={description}
    />
  );
}
