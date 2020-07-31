import Layout from "../components/layout/Layout";
import PageMeta from "../components/PageMeta";

function CodeOfConductRoute() {
  return (
    <Layout>
      <PageMeta
        title="Code of Conduct"
        description="Norfolk Developers are dedicated to providing an harassment-free conference experience for everyone."
      />

      <section className="section" id="code-of-conduct">
        <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
          <span className="text-red-500 font-bold">/</span>
          code-of-conduct
        </h1>

        <div id="short-version" className="mt-8 text-lg">
          <h3 className="text-xl font-bold">The Short Version</h3>
          <p className="mt-2">
            Norfolk Developers are dedicated to providing an harassment-free
            conference experience for everyone.
          </p>

          <p className="mt-2">
            All communication should be appropriate for a professional audience
            including people of many different backgrounds. Sexual or
            discriminatory language and imagery is not appropriate for any of
            the conference sessions or activities.
          </p>

          <p className="mt-2">
            Be kind to others. Do not insult or put down other attenders. Behave
            professionally. Remember that any discriminatory (as in sexist,
            racist, etc.) or exclusionary jokes are not appropriate.
          </p>

          <p className="mt-2">
            Attendees violating these rules will be asked to leave the
            conference without a refund at the sole discretion of the conference
            organisers.
          </p>
        </div>

        <div id="long-version" className="mt-8">
          <h3 className="text-xl font-bold">The Long Version</h3>

          <p className="mt-2">
            Norfolk Developers are dedicated to providing a harassment-free
            conference experience for everyone, regardless of gender, gender
            identity and expression, sexual orientation, disability, physical
            appearance, body size, race, age or religion. We do not tolerate
            harassment of conference participants in any form. Sexual language
            and imagery is not appropriate for any conference venue, including
            talks. Conference participants violating these rules may be
            sanctioned or expelled from the conference without a refund at the
            discretion of the conference organizers.
          </p>

          <div className="mt-2">
            Harassment includes, but is not limited to:
            <ul className="my-2 mx-6 list-disc">
              <li>
                Verbal comments that reinforce social structures of domination
                related to gender, gender identity and expression, sexual
                orientation, disability, physical appearance, body size, race,
                age, religion.
              </li>
              <li>Sexual images in public spaces</li>
              <li>Deliberate intimidation, stalking, or following</li>
              <li>Harassing photography or recording</li>
              <li>Sustained disruption of talks or other events</li>
              <li>Inappropriate physical contact</li>
              <li>Unwelcome sexual attention</li>
              <li>
                Advocating for, or encouraging, any of the above behaviour
              </li>
            </ul>
          </div>

          <p className="mt-2">
            Participants asked to stop any harassing behavior are expected to
            comply immediately
          </p>

          <p className="mt-2">
            Exhibitors and sponsors are also subject to the anti-harassment
            policy. In particular, exhibitors should not use sexualised images,
            activities, or other material. Exhibitor staff (including
            volunteers) should not use sexualised clothing/uniforms/costumes, or
            otherwise create a sexualised environment.
          </p>

          <p className="mt-2">
            Be careful in the words that you choose. Remember that sexist,
            racist, and other exclusionary jokes can be offensive to those
            around you.
          </p>

          <p className="mt-2">
            If a participant engages in behaviour that violates this code of
            conduct, the conference organisers may take any action they deem
            appropriate, including warning the offender or expulsion from the
            conference with no refund.
          </p>
        </div>

        <div id="reporting" className="mt-8">
          <h3 className="text-xl font-bold">Reporting</h3>

          <p className="mt-2">
            If someone makes you or anyone else feel unsafe or unwelcome, please
            report it as soon as possible. Conference staff can be identified by
            their t-shirts or lanyard badges. Harassment and other code of
            conduct violations reduce the value of our event for everyone. We
            want you to be happy at our event. People like you make our event a
            better place.
          </p>

          <p className="mt-2">
            <strong>
              You can make a report either personally or anonymously.
            </strong>
          </p>

          <h4 className="mt-4 text-md font-bold">Anonymous Report</h4>

          <p className="mt-2">
            You can make an{" "}
            <a
              className="text-purple-700 underline"
              href="https://norfolkdevelopers.wufoo.com/forms/zhey4wo1j2plxa/"
            >
              anonymous report here
            </a>
            .
          </p>

          <p className="mt-2">
            We can't follow up an anonymous report with you directly, but we
            will fully investigate it and take whatever action is necessary to
            prevent a recurrence.
          </p>

          <h4 className="mt-4 text-md font-bold">Personal Report</h4>

          <div className="mt-2">
            You can make a personal report by:
            <ul className="my-2 mx-6 list-disc">
              <li>
                Calling or messaging this phone number:{" "}
                <a
                  className="text-purple-700 underline"
                  href="tel:+447960 268011"
                >
                  07960 268011
                </a>
                . This phone number will be continuously monitored for the
                duration of the event.
              </li>
              <li>
                Contacting a staff member, identified by Norfolk Developer
                t-shirts.
              </li>
            </ul>
          </div>

          <p className="mt-2">
            When taking a personal report, our staff will ensure you are safe
            and cannot be overheard. They may involve other event staff to
            ensure your report is managed properly. Once safe, we'll ask you to
            tell us about what happened. This can be upsetting, but we'll handle
            it as respectfully as possible, and you can bring someone to support
            you. You won't be asked to confront anyone and we won't tell anyone
            who you are.
          </p>

          <p className="mt-2">
            Our team will be happy to help you contact local law enforcement,
            local support services, provide escorts, or otherwise assist you to
            feel safe for the duration of the event.{" "}
            <strong>We value your attendance.</strong>
          </p>

          <h4 className="mt-4 text-md font-bold">
            Other reporting/support options
          </h4>
          <ul className="my-2 mx-6 list-disc">
            <li>
              Email the team:{" "}
              <a
                className="text-purple-700 underline"
                href="conference@norfolkdevelopers.com"
              >
                conference@norfolkdevelopers.com
              </a>
            </li>
            <li>
              Call our team:{" "}
              <a
                className="text-purple-700 underline"
                href="tel:+447960 268011"
              >
                07960 268011
              </a>
            </li>
            <li>
              <a
                className="text-purple-700 underline"
                href="https://www.norfolk.police.uk/contact-us/report-it"
              >
                Norfolk Police's online reporting service
              </a>
            </li>
            <li>
              Call the Mind Infoline for support with a Mental Health Crisis on{" "}
              <a className="text-purple-700 underline" href="tel:0300 123 3393">
                0300 123 3393
              </a>{" "}
              or email{" "}
              <a
                className="text-purple-700 underline"
                href="mailto:info@mind.org.uk"
              >
                info@mind.org.uk
              </a>
              . You can also Text:{" "}
              <a className="text-purple-700 underline" href="sms://86463">
                86463
              </a>
            </li>
            <li>
              The Harbour Centre - Sexual Assault Referral Centre can be
              contacted by{" "}
              <a
                className="text-purple-700 underline"
                href="contact@theharbourcentre.co.uk"
              >
                email
              </a>{" "}
              or by phone 24/7 on{" "}
              <a className="text-purple-700 underline" href="tel:01603 276381">
                01603 276381
              </a>
            </li>
          </ul>
        </div>

        <div
          id="copyleft"
          className="mt-8 border-t-2 border-b-2 p-4 border-purple-700"
        >
          <p>
            This anti-harassment policy was inspired by the{" "}
            <a
              className="text-purple-700 underline"
              href="https://conference.accu.org/coc_code_of_conduct.html"
            >
              ACCU's Code of Conduct
            </a>
            , which itself is based on the example policy from the{" "}
            <a
              className="text-purple-700 underline"
              href="https://geekfeminism.wikia.org/wiki/Conference_anti-harassment"
            >
              Geek Feminism wiki
            </a>
            , created by the Ada Initiative and other volunteers.
          </p>

          <p>
            The ACCU Code of Conduct's is licensed under the{" "}
            <a
              className="text-purple-700 underline"
              href="https://creativecommons.org/licenses/by/3.0/"
            >
              Creative Commons Attribution
            </a>{" "}
            and the Geek Feminism Code of Conduct is itself licensed under the{" "}
            <a
              className="text-purple-700 underline"
              href="http://creativecommons.org/publicdomain/zero/1.0/"
            >
              Creative Commons Zero License
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default CodeOfConductRoute;
