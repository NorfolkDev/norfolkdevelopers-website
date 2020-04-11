type Props = {
  title: string;
  description?: string;
  imagePath?: string;
  buttonCTA?: string;
  buttonLink?: string;
  color?: string;
};

export default function FeatureCard({
  title,
  description,
  imagePath,
  buttonCTA,
  buttonLink,
  color = "gray",
}: Props) {
  return (
    <div className={`relative overflow-hidden md:rounded h-full`}>
      {imagePath && (
        <img
          className="object-cover h-full w-full opacity-50"
          src={imagePath}
        />
      )}
      <div
        className={
          "h-full w-full absolute inset-0 opacity-75 " + `bg-${color}-800`
        }
      ></div>
      <div className="w-full absolute bottom-0 p-6">
        <h3
          className={
            "font-bold text-2xl tracking-tighter " + `text-${color}-100`
          }
        >
          {title}
        </h3>
        <p
          className={
            "tracking-tight leading-tight text-lg " + `text-${color}-200`
          }
        >
          {description}
        </p>
        {buttonCTA && buttonLink && (
          <a
            className={
              "inline-block px-3 pt-1 pb-2 mt-3 rounded font-bold " +
              `text-${color}-900 bg-${color}-200 ` +
              `hover:bg-${color}-600 hover:text-${color}-100`
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
