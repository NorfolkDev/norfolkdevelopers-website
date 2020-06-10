import Layout from "../components/layout/Layout";
import Head from "next/head";
import siteConfig from "../../site.config";
import { getPosts, PostData, fetcher } from "@static-fns/blog";
import Link from "next/link";
import PostCard from "../components/PostCard";
import EventsList from "../components/EventsList";

type Props = {
  posts: PostData[];
  initialEventData: any[];
};

const numberOfEvents = 10;
const meetupAPIEndpoint = `https://cors-it-is.shaun.now.sh/?url=https://api.meetup.com/Norfolk-Developers-NorDev/events?&sign=true&photo-host=public&page=1&limit=${numberOfEvents}`;

export async function getStaticProps() {
  const initialEventData = await fetcher(meetupAPIEndpoint);
  return {
    props: { posts: getPosts().slice(0, 3), initialEventData },
    unstable_revalidate: 1,
  };
}

export default function IndexRoute({ posts, initialEventData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{siteConfig.siteName}</title>
      </Head>
      <section className="mt-12 md:mt-6">
        <header className="py-6 md:py-8 lg:py-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Going straight to the <span className="text-red-500">♥️</span> of
            software development practice and process
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl mt-3 text-foreground-secondary tracking-normal leading-tight">
            Local, national and international speakers and workshops for Norfolk
            Developers.
          </h2>
          <p className="text-foreground-tertiary">
            (🕸 over the interweb until further notice)
          </p>
        </header>
      </section>
      <section>
        <header className="flex flex-row items-center">
          <h2 className="text-base uppercase border-b-4 border-background-secondary tracking-widest my-8 text-foreground-secondary">
            Upcoming Events
          </h2>
          <span className="inline-block "></span>

          <a
            href="https://www.meetup.com/Norfolk-Developers-NorDev/events/"
            className="ml-auto text-foreground-primary"
          >
            All events &raquo;
          </a>
        </header>
        <EventsList
          endpoint={meetupAPIEndpoint}
          initialData={initialEventData}
        />
      </section>
      <section>
        <header className="flex flex-row items-center mt-8">
          <h2 className="text-base uppercase border-b-4 border-background-secondary tracking-widest my-8 text-foreground-secondary">
            Latest posts
          </h2>
          <span className="inline-block "></span>
          <Link href={`/${siteConfig.postsDirectory}`}>
            <a className="ml-auto text-foreground-primary">All posts &raquo;</a>
          </Link>
        </header>
        <ul className="-mx-4">
          {posts.map((post) => (
            <PostCard key={post.path} post={post} />
          ))}
        </ul>
      </section>
      <section>
        <header className="flex flex-row items-center mt-8">
          <h2 className="text-base uppercase border-b-4 border-background-secondary tracking-widest my-8 text-foreground-secondary"></h2>
        </header>
        <div className="grid grid-cols-2">
          <div>
            <img
              src="/static/images/pages/index/magazine2020.jpg"
              alt="nor dev magazine"
              className="w-40 md:w-56 float-right rounded"
            />
          </div>
          <div className="p-8">
            <p className="text-2xl font-bold">Download the Magazine</p>
            <p className="text-foreground-secondary">
              Articles from across the tech scene.
            </p>
            <a
              className="text-green-700 bg-green-200 mt-2 rounded p-2 inline-block font-bold"
              href="#"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
