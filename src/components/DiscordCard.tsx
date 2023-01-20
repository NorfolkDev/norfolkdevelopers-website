import DiscordIcon from "src/icons/DiscordIcon";

export default function DiscordCard() {
  return (
    <div className="flex flex-col gap-8 p-12 my-8 overflow-hidden text-white rounded-lg bg-[#5865F2] lg:grid lg:grid-cols-4 lg:-mx-16 xl:-mx-32 lg:my-16">
      <div className="col-span-3 lg:self-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Make new friends &amp; join the conversation
        </h2>
        <p className="mt-4 text-lg font-bold leading-6 text-indigo-100">
          Our friendly, active and helpful Discord server. We discuss topics
          related to software development, as well as share resources, tips and
          tricks. Whether you're a beginner or a professional, our members are
          here to help you out!
        </p>
        <a
          href="https://nor.dev/discord"
          className="inline-flex items-center px-5 py-3 mt-8 text-lg font-bold text-indigo-600 bg-white border border-transparent rounded-md shadow hover:bg-indigo-50"
        >
          Join the server
        </a>
      </div>

      <div className="col-span-1 -mt-64 opacity-10 lg:mt-0 lg:opacity-100">
        <div className="max-w-xs ml-auto rotate-12 drop-shadow-md">
          <DiscordIcon />
        </div>
      </div>
    </div>
  );
}
