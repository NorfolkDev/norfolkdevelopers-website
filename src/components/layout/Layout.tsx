import Link from "next/link";
import config from "../../../site.config";
import Head from "next/head";
import siteConfig from "../../../site.config";
import useDarkMode from "use-dark-mode";
import { useRouter } from "next/router";

const navLinks = [
  { url: `/${config.postsDirectory}`, label: "posts" },
  { url: "/code-of-conduct", label: "code of conduct" },
  { url: "/nordev-magazine", label: "magazine" },
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
                <svg
                  width="140"
                  viewBox="0 0 1121 275"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <g id="DEV">
                      <path
                        d="M575.252 202.946H611.581C618.809 202.946 625.242 201.18 630.878 197.647C636.513 194.116 641.264 189.366 645.134 183.392C649.001 177.424 651.902 170.487 653.836 162.579C655.769 154.676 656.737 146.268 656.737 137.352C656.737 127.599 655.769 118.727 653.836 110.735C651.902 102.75 649.042 95.8505 645.258 90.0478C641.474 84.2452 636.766 79.7478 631.13 76.5505C625.496 73.3585 619.06 71.7572 611.832 71.7572H575.252V202.946ZM555.066 53.8452H615.614C625.537 53.8452 634.322 56.2852 641.98 61.1612C649.633 66.0412 656.021 72.3892 661.153 80.2078C666.28 88.0292 670.193 96.9025 672.885 106.826C675.57 116.751 676.92 126.843 676.92 137.099C676.92 147.53 675.57 157.787 672.885 167.878C670.193 177.97 666.325 186.926 661.28 194.747C656.232 202.567 650.009 208.875 642.612 213.667C635.208 218.463 626.717 220.859 617.129 220.859H555.066V53.8452Z"
                        fill="#BF1C2E"
                      />
                      <path
                        d="M804.575 53.8447V71.7567H723.593V125.746H799.782V143.658H723.593V202.945H808.106V220.858H703.41V53.8447H804.575Z"
                        fill="#BF1C2E"
                      />
                      <path
                        d="M842.921 53.8447L883.035 187.304H883.287L923.148 53.8447H945.349L894.388 220.858H871.932L820.719 53.8447H842.921Z"
                        fill="#BF1C2E"
                      />
                    </g>

                    <g id="NOR">
                      <path
                        d="M41.696 80.7857V97.399C55.92 84.043 70.852 77.3643 86.4893 77.3643C99.8453 77.3643 110.889 82.8497 119.632 93.815C128.372 104.784 132.743 118.791 132.743 135.836V220.859H90.396V142.515C90.396 134.48 88.1973 127.694 83.8 122.155C79.4013 116.619 74.0547 113.85 67.7547 113.85C60.156 113.85 53.912 117.351 49.0267 124.354C44.14 131.359 41.696 140.398 41.696 151.474V220.859H0V80.7857H41.696Z"
                        fill={logoColor}
                      />
                      <path
                        d="M273.793 151.147C273.793 141.702 270.698 133.45 264.507 126.391C258.319 119.334 251.098 115.804 242.846 115.804C234.266 115.804 226.885 119.118 220.694 125.739C214.506 132.363 211.411 140.291 211.411 149.518C211.411 159.618 214.479 168.196 220.615 175.252C226.747 182.312 234.158 185.84 242.846 185.84C251.098 185.84 258.319 182.394 264.507 175.498C270.698 168.603 273.793 160.487 273.793 151.147ZM170.042 151.147C170.042 129.542 176.935 111.895 190.727 98.2122C204.515 84.5322 222.217 77.6909 243.825 77.6909C263.911 77.6909 280.769 84.6696 294.397 98.619C308.021 112.574 314.837 129.867 314.837 150.496C314.837 171.563 308.021 189.043 294.397 202.942C280.769 216.842 263.697 223.79 243.173 223.79C220.043 223.79 202.071 216.435 189.263 201.72C176.449 187.008 170.042 170.15 170.042 151.147Z"
                        fill={logoColor}
                      />
                      <path
                        d="M390.573 80.7853V101.47H391.222C395.35 94.5226 400.155 89.0093 405.638 84.9386C411.121 80.8679 416.198 78.8306 420.87 78.8306C423.689 78.8306 426.241 79.0506 428.522 79.4813V125.087C425.045 124.435 421.627 124.111 418.262 124.111C409.683 124.111 403.034 127.123 398.31 133.148C393.587 139.175 391.222 147.62 391.222 158.478V220.859H348.878V80.7853H390.573Z"
                        fill={logoColor}
                      />
                      <path
                        d="M502.305 0L525.923 20.0333C525.053 21.4453 523.695 23.4533 521.85 26.0586C498.721 58.744 487.158 95.6626 487.158 136.815C487.158 157.881 489.847 177.451 495.219 195.529C500.597 213.609 510.829 233.18 525.923 254.247L502.305 274.605C485.797 254.949 473.773 232.964 466.227 208.641C458.678 184.32 454.907 159.943 454.907 135.511C454.907 112.383 458.655 89.092 466.147 65.6386C473.638 42.184 485.691 20.3053 502.305 0Z"
                        fill={logoColor}
                      />
                      <path
                        d="M959.421 20.0333L983.362 0C999.976 20.0893 1011.97 42.1026 1019.36 66.0453C1026.74 89.988 1030.43 113.58 1030.43 136.815C1030.43 190.131 1014.96 236.059 984.013 274.605L959.421 254.247C985.373 220.264 998.349 181.227 998.349 137.14C998.349 93.1626 985.373 54.1293 959.421 20.0333Z"
                        fill={logoColor}
                      />
                      <path
                        d="M959.421 20.0333L983.362 0C999.976 20.0893 1011.97 42.1026 1019.36 66.0453C1026.74 89.988 1030.43 113.58 1030.43 136.815C1030.43 190.131 1014.96 236.059 984.013 274.605L959.421 254.247C985.373 220.264 998.349 181.227 998.349 137.14C998.349 93.1626 985.373 54.1293 959.421 20.0333Z"
                        fill={logoColor}
                        stroke={logoColor}
                        strokeWidth="1.517"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M1069.03 197.567C1069.03 190.401 1071.56 184.267 1076.61 179.161C1081.66 174.059 1087.71 171.506 1094.77 171.506C1101.93 171.506 1108.07 174.059 1113.17 179.161C1118.28 184.267 1120.83 190.401 1120.83 197.567C1120.83 204.626 1118.28 210.651 1113.17 215.645C1108.07 220.643 1101.93 223.139 1094.77 223.139C1087.6 223.139 1081.52 220.643 1076.53 215.645C1071.53 210.651 1069.03 204.626 1069.03 197.567ZM1068.38 112.058C1068.38 105.001 1070.93 98.921 1076.04 93.8152C1081.14 88.7125 1087.28 86.1592 1094.45 86.1592C1101.61 86.1592 1107.74 88.7125 1112.85 93.8152C1117.95 98.921 1120.5 105.001 1120.5 112.058C1120.5 119.223 1117.95 125.306 1112.85 130.299C1107.74 135.295 1101.61 137.791 1094.45 137.791C1087.28 137.791 1081.14 135.295 1076.04 130.299C1070.93 125.306 1068.38 119.223 1068.38 112.058Z"
                        fill={logoColor}
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="1120.83" height="274.605" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
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
