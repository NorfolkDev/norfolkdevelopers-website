import Link from "next/link";
import config from "../../../site.config";

const navLinks = [
  { url: `/${config.postsDirectory}`, label: "words" },
  { url: "/apps", label: "apps" },
  { url: "/music", label: "music" }
];

type Props = {
  children: React.ReactNode;
  location?: string;
};

export default function Layout({ children, location }: Props) {
  return (
    <div className="ml-auto mr-auto w-full md:w-4/5 lg:max-w-5xl mb-64">
      <header className="md:flex h-32 fade-out">
        <h1 className="inset font-extrabold text-3xl hover:text-blue-600 self-center">
          <Link href="/">
            <a>{config.siteName}</a>
          </Link>
        </h1>
        <nav className="inset text-2xl font-normal align-middle justify-center self-center">
          {navLinks.map(navLink => (
            <Link href={navLink.url} key={navLink.label}>
              <a className="pr-2 pl-2 font-semibold text-blue-600 hover:text-blue-400">
                {navLink.label}
              </a>
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
