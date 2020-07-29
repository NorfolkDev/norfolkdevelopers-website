const s3bucket =
  "https://norfolkdevelopers.s3.eu-west-2.amazonaws.com/norfolkdevelopers-website";

type Props = {
  title: string;
  slug: string;
  children: React.ReactNode;
};

export default function MagazineCard({ title, slug, children }: Props) {
  return (
    <div className="flex flex-col md:flex-row mb-6 py-4 px-4 hover:border rounded">
      <div className="mr-6 w-full mb-1 md:mt-2 md:mb-0 md:w-2/12">
        <img src={`/static/images/pages/nordev-magazine/${slug}.jpg`} />
      </div>
      <div className="mt-4 md:mt-0 md:w-10/12">
        <h3 className="text-2xl text-foreground-primary font-bold tracking-tight">
          {title}
        </h3>

        {children}

        <a
          className="mt-4 text-green-700 bg-green-200 mt-2 rounded p-2 inline-block font-bold hover:text-green-900 hover:bg-green-400"
          href={`${s3bucket}/${slug}.pdf`}
          download
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
