import React from "react";
import { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "../components/layout/MDXComponents";
import "../css/tailwind.css";

export function reportWebVitals(metric: any) {
  // These metrics can be sent to any analytics service
  console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
