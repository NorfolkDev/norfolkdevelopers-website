type Props = {
  title: string;
  description?: string;
  imagePath?: string;
  buttonCTA?: string;
  buttonLink?: string;
  color?: FeatureThemes;
};

export enum FeatureThemes {
  orange,
  gray,
  blue,
  green,
  pink,
}

const featureThemes = {
  [FeatureThemes.orange]: {
    border: "border-orange-700 border-t",
    bgOverlay: "bg-orange-800",
    textHeader: "text-orange-100",
    textBody: "text-orange-200",
    button:
      "bg-orange-100 text-orange-800 hover:bg-orange-900 hover:text-orange-100",
  },
  [FeatureThemes.pink]: {
    border: "border-pink-700 border-t",
    bgOverlay: "bg-pink-800",
    textHeader: "text-pink-100",
    textBody: "text-pink-200",
    button: "bg-pink-100 text-pink-800 hover:bg-pink-900 hover:text-pink-100",
  },
  [FeatureThemes.blue]: {
    border: "border-blue-700 border-t",
    bgOverlay: "bg-blue-800",
    textHeader: "text-blue-100",
    textBody: "text-blue-200",
    button: "bg-blue-100 text-blue-800 hover:bg-blue-900 hover:text-blue-100",
  },
  [FeatureThemes.green]: {
    border: "border-green-700 border-t",
    bgOverlay: "bg-green-800",
    textHeader: "text-green-100",
    textBody: "text-green-200",
    button:
      "bg-green-100 text-green-800 hover:bg-green-900 hover:text-green-100",
  },
  [FeatureThemes.gray]: {
    border: "border-gray-700 border-t",
    bgOverlay: "bg-gray-800",
    textHeader: "text-gray-100",
    textBody: "text-gray-200",
    button: "bg-gray-100 text-gray-800 hover:bg-gray-900 hover:text-gray-100",
  },
};

function getTheme(color: FeatureThemes) {
  if (!(color in featureThemes)) {
    return featureThemes[FeatureThemes.gray];
  }
  return featureThemes[color];
}

export default function FeatureCard({
  title,
  description,
  imagePath,
  buttonCTA,
  buttonLink,
  color = FeatureThemes.gray,
}: Props) {
  const theme = getTheme(color);
  return (
    <div
      className={`relative overflow-hidden md:rounded h-full ${theme.border} shadow-lg`}
    >
      {imagePath && (
        <img
          className="object-cover h-full w-full opacity-50"
          src={imagePath}
          alt={description}
        />
      )}
      <div
        className={`h-full w-full absolute inset-0 opacity-75 ${theme.bgOverlay}`}
      ></div>
      <div className="w-full absolute bottom-0 p-4">
        <h3
          className={`font-bold text-2xl tracking-tighter ${theme.textHeader}`}
        >
          {title}
        </h3>
        <p className={`tracking-tight leading-tight text-lg ${theme.textBody}`}>
          {description}
        </p>
        {buttonCTA && buttonLink && (
          <a
            className={`inline-block px-3 pt-1 pb-2 mt-3 rounded font-bold ${theme.button}`}
            href={buttonLink}
          >
            {buttonCTA}
          </a>
        )}
      </div>
    </div>
  );
}
