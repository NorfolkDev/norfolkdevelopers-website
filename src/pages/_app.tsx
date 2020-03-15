import React from "react";
import { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "../components/layout/MDXComponents";
import "../css/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
