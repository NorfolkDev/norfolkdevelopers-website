import Layout from "../components/layout/Layout";
import siteConfig from "../../site.config";
import { fetcher } from "src/fetcher";
import Link from "next/link";
import PostCard from "../components/PostCard";
import EventsList from "../components/EventsList";
import MagazineCard from "../components/MagazineCard";
import { Post } from "contentlayer/generated";
import { getPosts } from "providers/ContentProvider";
import DiscordCard from "src/components/DiscordCard";

type Props = {
  posts: Post[];
  initialEventData: any[];
};

// const meetupAPIEndpoint = `${siteConfig.meetupSrc}?limit=${siteConfig.meetupEventCount}`;

export async function getStaticProps() {
  // const initialEventData = await fetcher(meetupAPIEndpoint);
  const Posts = getPosts();

  return {
    props: {
      posts: Posts.slice(0, 3),
      // initialEventData,
    },
    revalidate: 60,
  };
}

export default function IndexRoute({ posts/* , initialEventData  */ }: Props) {
  return (
    <Layout>
      <section className="mt-12 md:mt-6">
        <header className="py-6 md:py-8 lg:py-16">
          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Going straight to the <span className="text-red-500">♥️</span> of
            software development practice and process
          </h1>

          <h2 className="mt-3 text-xl leading-tight tracking-normal sm:text-2xl md:text-3xl text-foreground-secondary">
            Local, national and international speakers and workshops for Norfolk
            Developers.
          </h2>
          <p className="text-foreground-tertiary">
            (
            <span role="img" aria-label="web">
              🕸
            </span>{" "}
            over the interweb until further notice)
          </p>
        </header>
      </section>
      <section>
        <header className="flex flex-row items-center">
          <h2 className="my-8 text-base tracking-widest uppercase border-b-4 border-background-secondary text-foreground-secondary">
            Upcoming Events
          </h2>
          <span className="inline-block "></span>

        </header>
        <div>
          <a
            href="https://www.meetup.com/Norfolk-Developers-NorDev/events/"
            className="mt-4 text-green-700 bg-green-200 rounded p-2 inline-block font-bold hover:text-green-900 hover:bg-green-400"
          >
            See all our upcoming events on Meetup
          </a>
        </div>
        {/*
        <EventsList
          endpoint={meetupAPIEndpoint}
          initialData={initialEventData}
        />
        */}
      </section>
      <section>
        <header className="flex flex-row items-center mt-8">
          <h2 className="my-8 text-base tracking-widest uppercase border-b-4 border-background-secondary text-foreground-secondary">
            Latest posts
          </h2>
          <span className="inline-block "></span>
          <Link href={`/${siteConfig.postsDirectory}`}>
            <a className="ml-auto text-foreground-primary">All posts &raquo;</a>
          </Link>
        </header>
        <ul className="-mx-4">
          {posts.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </ul>
      </section>
      <section>
        <DiscordCard />
      </section>
      <section>
        <header className="flex flex-row items-center mt-8">
          <h2 className="my-8 text-base tracking-widest uppercase border-b-4 border-background-secondary text-foreground-secondary">
            Latest Magazine
          </h2>
          <span className="inline-block "></span>
          <Link href="nordev-magazine">
            <a className="ml-auto text-foreground-primary">
              All magazines &raquo;
            </a>
          </Link>
        </header>
        <MagazineCard
          title="February 2020 Conference Edition"
          slug="nordevmag-02-2020"
        >
          <p>
            Featuring; Interviews with the Ladies Hacking Society of Norwich.
            Articles on Train Wreck, Ramblings on Micro services, Tom's Top Tips
            for 2020, &amp; What is design?
          </p>
        </MagazineCard>
      </section>
    </Layout>
  );
}
