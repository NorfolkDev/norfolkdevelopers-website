type Props = {
  title: string;
  description?: string;
  imagePath?: string;
  buttonCTA?: string;
  buttonLink?: string;
  bgColor?: string;
  headlineColor?: string;
  bodyColor?: string;
};

export default function FeatureCard({
  title,
  description,
  imagePath,
  buttonCTA,
  buttonLink,

  bgColor = "bg-pink-700",
  headlineColor = "text-pink-100",
  bodyColor = "text-pink-200",
}: Props) {
  return (
    <div className={`${bgColor}  relative overflow-hidden md:rounded h-full`}>
      {imagePath && (
        <img
          className="object-cover h-full w-full opacity-50"
          src={imagePath}
        />
      )}
      <div
        className={"h-full w-full absolute inset-0 opacity-75" + ` ${bgColor}`}
      ></div>
      <div className="w-full absolute bottom-0 p-6">
        <h3
          className={
            "font-bold text-2xl tracking-tighter text-pink-100 " + headlineColor
          }
        >
          {title}
        </h3>
        <p className={"tracking-tight leading-tight text-lg " + bodyColor}>
          {description}
        </p>
        {buttonCTA && buttonLink && (
          <a
            className={
              "inline-block px-3 pt-1 pb-2 mt-3 rounded font-bold " +
              `${headlineColor} ${bgColor}`
            }
            href={buttonLink}
          >
            {buttonCTA}
          </a>
        )}
      </div>
    </div>
  );
}
