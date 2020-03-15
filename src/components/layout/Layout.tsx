import Link from "next/link";
import config from "../../../site.config";

const navLinks = [
  { url: `/${config.postsDirectory}`, label: "blog" },
  { url: "/about", label: "about" }
];

export default function Layout({ children }) {
  return (
    <div className="ml-auto mr-auto w-full lg:w-2/3">
      <header>
        <h1 className="text-center pt-16 pb-2 font-bold text-3xl hover:text-blue-400">
          <Link href="/">
            <a>{config.siteName}</a>
          </Link>
        </h1>
        <nav className="text-2xl text-center font-normal">
          {navLinks.map(navLink => (
            <Link href={navLink.url} key={navLink.label}>
              <a className="pr-2 pl-2 text-blue-400 hover:text-blue-700">
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
