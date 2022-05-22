export default function NorDevCon({
  title = "The eastern region's biggest tech conference",
  tagline = "Join us for the incredible line-up on the 16th & 17th June 2022",
  cta = "Get your ticket",
  href = "https://ti.to/norfolkdevelopers/nordevcon-22",
  website = "https://nordevcon.com",
}) {
  return (
    <div className="lg:-mx-40">
      <div className="py-16 mx-auto max-w-7xl lg:px-8">
        <div className="overflow-hidden bg-indigo-700 rounded-lg shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:pt-16 sm:px-16 lg:pl-32 lg:pr-0">
            <div className="lg:self-center">
              <h2 className="font-extrabold text-white text-md sm:text-2xl">
                <img
                  className="mb-4"
                  src="/static/images/nordevcon-logo.png"
                  alt="App screenshot"
                />
                <span className="block">{title}</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-200">
                {tagline}
              </p>
              <a
                href={href}
                className="inline-flex items-center px-5 py-3 mt-8 text-base font-extrabold text-indigo-800 bg-white border border-transparent rounded-md shadow hover:bg-indigo-100 hover:text-indigo-900"
              >
                {cta}
              </a>
              <a
                href={website}
                className="inline-flex items-center px-5 py-3 mx-4 mt-8 text-base font-extrabold text-indigo-800 bg-indigo-200 border border-transparent rounded-md shadow hover:bg-indigo-300 hover:text-indigo-900"
              >
                See the schedule
              </a>
            </div>
          </div>

          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              className="object-cover object-center transform translate-x-6 translate-y-6 rounded-md sm:translate-x-16 lg:translate-y-20"
              src="/static/images/nordevcon-feature.jpg"
              alt={tagline}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
