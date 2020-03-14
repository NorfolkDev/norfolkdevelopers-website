import Link from "next/link";

const navLinks = [
  { url: "/words", label: "words" },
  { url: "/music", label: "music" },
  { url: "/apps", label: "apps" },
  { url: "/about", label: "about" }
];

export default function Layout({ children }) {
  return (
    <div className="ml-auto mr-auto w-full lg:w-2/3">
      <header>
        <h1 className="text-center pt-16 pb-2 font-bold">
          <Link href="/">
            <a>shaun.church</a>
          </Link>
        </h1>
        <nav className="text-xl text-center font-normal">
          {navLinks.map(navLink => (
            <Link href={navLink.url}>
              <a className="pr-2 pl-2 text-blue-700">{navLink.label}</a>
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
