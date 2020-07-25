import Link from "next/link";
import config from "../../../site.config";
import Head from "next/head";
import siteConfig from "../../../site.config";
import useDarkMode from "use-dark-mode";
import { useRouter } from "next/router";
import Logo from "../Logo";

const navLinks = [
  { url: `/${config.postsDirectory}`, label: "posts" },
  { url: "/code-of-conduct", label: "code of conduct" },
  { url: "/nordev-magazine", label: "magazine" },
  { url: "/about", label: "about" },
];

type Props = {
  children: React.ReactNode;
  location?: string;
};

export default function Layout({ children, location }: Props) {
  const darkMode = useDarkMode(false);
  const router = useRouter();
  const logoColor = darkMode.value ? "#e2e8f0" : "#1a202c";

  return (
    <div
      className={`text-foreground-primary px-8 bg-background-primary duration-200 border-t-0 border-red-500`}
    >
      <Head>
        <title>{siteConfig.siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteConfig.description} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS Feed for ${siteConfig.siteName}`}
          href="/rss.xml"
        />
      </Head>

      <div className="flex flex-col min-h-screen ml-auto mr-auto w-full md:w-4/5 lg:max-w-3xl">
        <header className="mt-6 flex fade-out">
          <h1 className="font-extrabold tracking-tight text-2xl mr-4 md:text-3xl">
            <Link href="/">
              <a className={router.pathname === "/" ? "border-b-4" : ""}>
                {/* {config.siteName} */}
                <Logo color={logoColor} />
              </a>
            </Link>
          </h1>
          <nav className="text-xl font-normal align-middle justify-center self-center">
            {navLinks.map((navLink) => (
              <Link href={navLink.url} key={navLink.label}>
                <a
                  className={
                    "px-2 md:px-3 py-2 font-semibold hover:text-red-500 " +
                    `${
                      router.pathname.includes(navLink.url)
                        ? "border-b-4 pb-2 border-red-500"
                        : "text-foreground-primary"
                    }`
                  }
                >
                  {navLink.label}
                </a>
              </Link>
            ))}
          </nav>
          <button
            onClick={() => darkMode.toggle()}
            id="toggleTheme"
            aria-pressed={darkMode.value}
            className="ml-auto p-2 inline-block transform hover:-rotate-180 duration-300 ease-in-out "
          >
            {darkMode.value ? "☀️" : "😎"}
          </button>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="my-6 border-border-primary py-4 text-base text-foreground-secondary text-center">
          <span className="inline-block p-2 transform rotate-0 hover:-rotate-180 duration-500 ease-in-out cursor-pointer">
            &copy; Norfolk Developers Ltd.
          </span>
        </footer>
      </div>
    </div>
  );
}
