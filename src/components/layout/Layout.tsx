import Link from "next/link";
import config from "../../../site.config";
import Head from "next/head";
import siteConfig from "../../../site.config";
import useDarkMode from "use-dark-mode";
import { useRouter } from "next/router";

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
  const darkMode = useDarkMode(false);
  const router = useRouter();

  return (
    <div
      className={`text-foreground-primary px-4 bg-background-primary duration-200 border-t-2 border-pink-500`}
    >
      <Head>
        <title>{siteConfig.siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteConfig.description} />
      </Head>

      <div className="flex flex-col min-h-screen ml-auto mr-auto w-full md:w-4/5 lg:max-w-3xl">
        <header className="mt-6 md:mt-16 md:mb-16 md:flex fade-out">
          <h1 className="inset font-extrabold tracking-tight text-2xl md:text-3xl hover:text-pink-500">
            <Link href="/">
              <a>{config.siteName}</a>
            </Link>
          </h1>
          <nav className="inset text-lg font-normal align-middle justify-center self-center">
            {navLinks.map((navLink) => (
              <Link href={navLink.url} key={navLink.label}>
                <a
                  className={
                    "pr-2 pl-2 font-semibold " +
                    `${
                      router.pathname === navLink.label
                        ? "text-pink-500"
                        : "text-teal-500"
                    }`
                  }
                >
                  /{navLink.label}
                </a>
              </Link>
            ))}
            <button onClick={() => darkMode.toggle()}>
              {darkMode.value ? "☀️" : "😎"}
            </button>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="inset my-6 border-t border-border-primary py-4 text-base text-foreground-secondary text-center">
          Made by 👽
        </footer>
      </div>
    </div>
  );
}
