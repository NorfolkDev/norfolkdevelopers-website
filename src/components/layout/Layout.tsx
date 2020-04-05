import Link from "next/link";
import config from "../../../site.config";
import Head from "next/head";
import siteConfig from "../../../site.config";
import { useState } from "react";

const navLinks = [
  { url: `/${config.postsDirectory}`, label: "words" },
  { url: "/apps", label: "apps" },
  { url: "/music", label: "music" },
];

type Props = {
  children: React.ReactNode;
  location?: string;
};

export default function Layout({ children, location }: Props) {
  const [theme, setTheme] = useState("dark");

  return (
    <div
      className={`theme-${theme} text-foreground-primary px-8 bg-background-primary duration-200`}
    >
      <Head>
        <title>{siteConfig.siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteConfig.description} />
      </Head>

      <div className=" flex flex-col min-h-screen ml-auto mr-auto w-full md:w-4/5 lg:max-w-3xl">
        <header className="mt-6 md:mt-16 md:mb-16 md:flex fade-out">
          <h1 className="inset font-extrabold text-3xl hover:text-blue-600 self-center">
            <Link href="/">
              <a>{config.siteName}</a>
            </Link>
          </h1>
          <nav className="inset text-lg font-normal align-middle justify-center self-center">
            {navLinks.map((navLink) => (
              <Link href={navLink.url} key={navLink.label}>
                <a className="pr-2 pl-2 font-semibold text-foreground-secondary hover:text-blue-400">
                  /{navLink.label}
                </a>
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "☀️" : "😎"}
            </button>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="inset m-6 border-t py-4 text-base text-foreground-secondary text-center">
          Made by 👽
        </footer>
      </div>
    </div>
  );
}
