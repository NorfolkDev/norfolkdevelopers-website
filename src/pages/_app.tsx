import { AppProps } from "next/app";
import "../css/tailwind.css";

export function reportWebVitals(metric: any) {
  // These metrics can be sent to any analytics service
  console.log(metric);
}

// @TODO: Generate RSS, at /rss
// @TODO: Removal of MDXProvider here - ensure MDX Components (MagazineCard & NorDevCon still available)
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
