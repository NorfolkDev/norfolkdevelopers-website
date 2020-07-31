import Layout from "../components/layout/Layout";
import MagazineCard from "../components/MagazineCard";
import PageMeta from "../components/PageMeta";


function MagazineRoute() {
  return (
    <Layout>
      <PageMeta
        title="Magazine"
        description="The nor(DEV): magazine was started back in 2016 to accompany our annual conference, nor(DEV):con. Our last edition was in Feb 2020"
      />

      <section className="section" id="nordev-magazine">
        <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
          <span className="text-red-500 font-bold">/</span>
          nordev-magazine
        </h1>

        <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
          <p>
            The nor(DEV): magazine was started back in 2016 to accompany our
            annual conference, nor(DEV):con. Our last edition was in Feb 2020,
            and we will now continue to deliver these articles to you, here, at
            norfolkdevelopers.com
          </p>

          <ol className="-mx-4 mt-4">
            <li>
              <MagazineCard
                title="February 2020 Conference Edition"
                slug="nordevmag-02-2020"
              >
                <p>
                  Featuring; Interviews with the Ladies Hacking Society of
                  Norwich. Articles on Train Wreck, Ramblings on Micro services,
                  Tom's Top Tips for 2020, &amp; What is design?
                </p>
              </MagazineCard>
            </li>
            <li>
              <MagazineCard
                title="August 2018 Edition"
                slug="nordevmag-08-2018"
              >
                <p>
                  Featuring; Interviews with Youth in Tech, Tech Velocity.
                  Articles on the Importance of Learning &amp; Teaching Webapps.
                  Plus a review of the Apple Worldwide Developers Conference.
                </p>
              </MagazineCard>
            </li>
            <li>
              <MagazineCard
                title="February 2018 Conference Edition"
                slug="nordevmag-02-2018"
              >
                <p>
                  Featuring; Interviews with Rainbird, TechEast. Articles on
                  Five Tell-Tale Signs Your Brand isn't Working, &amp; Future
                  Tech in Norwich. Plus a review of the DevelopHER awards.
                </p>
              </MagazineCard>
            </li>
            <li>
              <MagazineCard
                title="September 2017 Edition"
                slug="nordevmag-09-2017"
              >
                <p>
                  Featuring; Interviews with SyncDevelopHER, nor(DEV):. Articles
                  from Ubisend on AI, and on Patterns, 3D Printing, &amp;
                  Talking to the Clouds.
                </p>
              </MagazineCard>
            </li>
            <li>
              <MagazineCard
                title="February 2017 Conference Edition"
                slug="nordevmag-02-2017"
              >
                <p>
                  Featuring; Interviews with Cascade.bi, Adrian Pickering &amp;
                  Gerard Parr. Articles on Protect Your Privacy, Agile in a
                  Small Studio, &amp; Third-Party Dependencies
                </p>
              </MagazineCard>
            </li>
          </ol>
        </main>
      </section>
    </Layout>
  );
}

export default MagazineRoute;
