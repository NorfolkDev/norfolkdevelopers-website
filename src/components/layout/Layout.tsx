import Link from "next/link";
import dynamic from 'next/dynamic'
import config from "../../../site.config";
import { useRouter } from "next/router";
import Logo from "../Logo";
import PageMeta from "../PageMeta";
import { useEffect, useState } from "react";

const DarkModeToggle = dynamic(() => import('../DarkModeToggle'), {
  ssr: false
});

const navLinks = [
  { url: `/${config.postsDirectory}`, label: "posts" },
  { url: `/${config.jobsDirectory}`, label: "jobs" },
  { url: "/code-of-conduct", label: "code of conduct" },
  { url: "/nordev-magazine", label: "magazine" },
  { url: "/about", label: "about" },
];

type Props = {
  children: React.ReactNode;
  location?: string;
};

export default function Layout({ children, location }: Props) {
  const router = useRouter();
  const [transitionDurationClass, setTransitionDurationClass] = useState('');

  useEffect(() => {
    // This little maneuver ~~is gonna~~ cost us 51 years...
    // Chrome seems to apply a transition on the background sometimes on initial load from white (no content) -> dark when in darkmode.
    // Applying the duration style only on the client side render fixes it.
    setTransitionDurationClass('duration-1000');
  }, []);

  return (
    <>
      <PageMeta />

      <div
        className={`text-foreground-primary px-8 bg-background-primary ${transitionDurationClass} border-t-0 border-red-500`}
      >
        <div className="flex flex-col min-h-screen ml-auto mr-auto w-full md:w-4/5 lg:max-w-3xl">
          <header className="mt-6 md:mb-3 flex flex-wrap fade-out">
            <h1 className="order-1 font-extrabold tracking-tight text-2xl mr-4 md:text-3xl">
              <Link href="/">
                <a className={router.pathname === "/" ? "border-b-4" : ""}>
                  {/* {config.siteName} */}
                  <Logo />
                </a>
              </Link>
            </h1>
            <nav className="order-3 lg:order-2 w-full lg:w-auto mt-3 lg:mt-0 lg:pl-3 text-sm md:text-xl font-normal align-middle justify-center self-center">
              {navLinks.map((navLink) => (
                <Link href={navLink.url} key={navLink.label}>
                  <a
                    className={
                      "block md:inline -ml-2 mb-1 md:m-0 pl-1 p-0 md:pl-0 md:py-2 md:mr-6 border-l-4 md:border-l-0 border-transparent font-semibold hover:text-red-500 " +
                      `${
                        router.pathname.includes(navLink.url)
                          ? "md:border-b-4 border-red-500"
                          : "text-foreground-primary"
                      }`
                    }
                  >
                    {navLink.label}
                  </a>
                </Link>
              ))}
            </nav>
            <DarkModeToggle />
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="my-6 border-border-primary py-4 text-base text-foreground-secondary text-center">
            <span className="inline-block p-2 transform rotate-0 hover:-rotate-180 duration-500 ease-in-out cursor-pointer">
              &copy; Norfolk Developers Ltd.
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
