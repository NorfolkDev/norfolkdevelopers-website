import Link from "next/link";
import siteConfig from "../../site.config";

type Props = {
  tag: string;
};

type TagTheme = {
  background: string;
  foreground: string;
};

const TAG_COLOURS: { [key: string]: TagTheme } = {
  music: {
    background: "bg-red-200",
    foreground: "text-red-800",
  },
  dev: {
    background: "bg-green-200",
    foreground: "text-green-800",
  },
  test: {
    background: "bg-blue-200",
    foreground: "text-blue-800",
  },
  default: {
    background: "bg-grey-300",
    foreground: "text-grey-700",
  },
};

function getClasses(key: string): string {
  if (!(key in TAG_COLOURS)) {
    key = "default";
  }
  return `${TAG_COLOURS[key].background} ${TAG_COLOURS[key].foreground}`;
}

export default function Tag(props: Props) {
  const { tag } = props;

  return (
    <span
      className={`rounded-full bg-gray-200 p-1 mr-2 text-xs font-bold text-gray-600 px-2 ${getClasses(
        tag
      )}`}
      key={tag}
    >
      {siteConfig.features.tagPages ? (
        <Link href={`/tag/${tag}`}>
          <a> #{tag} </a>
        </Link>
      ) : (
        <a> #{tag} </a>
      )}
    </span>
  );
}
