import { ZipUpload } from "@/app/components/upload";
import { FaGithub } from "react-icons/fa6";
export const WelcomePage = () => {
  return (
    <>
      {/* introduction */}
      <section>
        <h1 className="xl:text-4xl lg:text-2xl md:text-lxl font-bold text-spotifygreen">
          Welcome to the Spotify data visualizer site!
        </h1>

        <h2 className="mt-2 xl:text-2xl lg:text-xl md:text-lg italic">
          This site allows you to graphically visualize your Spotify data.
        </h2>
      </section>

      {/* features */}
      <section className="mt-4">
        <p className="xl:text-lg lg:text-base md:text-sm font-bold text-spotifygreen">
          Features include:
        </p>
        <ul className="xl:text-base lg:text-sm md:text-xs list-disc ml-8 marker:text-spotifygreen">
          <li>Seeing your most played songs ever.</li>
          <li>Seeing your most listened to artists ever.</li>
          <li>
            Seeing your most listened to songs and artists for specific time
            periods.
          </li>
          <li>See your search history.</li>
          <li>See the songs you&apos;ve historically skipped the most.</li>
        </ul>
      </section>

      {/* instructions */}
      <section className="mt-8">
        <h3 className="xl:text-2xl lg:text-xl md:text-lg font-bold text-spotifygreen">
          How to get started:
        </h3>

        <div className="xl:text-base lg:text-sm md:text-xs mt-2 ml-4">
          <h4 className="xl:text-lg lg:text-base md:text-sm font-bold text-spotifygreen">
            First
          </h4>
          <p>
            Download your Spotify account data from
            <a
              href="https://www.spotify.com/us/account/privacy/"
              target="_blank"
              className="underline p-1"
            >
              Spotify&apos;s website
            </a>
            in your account privacy settings.
          </p>
          <p>(You need to be logged in to Spotify to access this page.)</p>
          <p>
            If you want the full experience, download both your &apos;Account
            data&apos; and your &apos;Extended streaming history&apos;.
          </p>

          <p>It might take a few days for Spotify to prepare your data.</p>

          <h4 className="mt-2 xl:text-lg lg:text-base md:text-sm font-bold text-spotifygreen">
            Second
          </h4>
          <p>
            Upload the &apos;.zip&apos; files that you downloaded from Spotify
            to this website.
          </p>
          <p>
            You can select and upload your Spotify data a little further down on
            this page.
          </p>

          <h4 className="mt-2 xl:text-lg lg:text-base md:text-sm font-bold text-spotifygreen">
            Third
          </h4>
          <p>
            Enjoy going through a beautiful and nostalgic trip of your listening
            habits!
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="xl:text-2xl lg:text-xl md:text-lg font-bold text-spotifygreen">
          IMPORTANT:
        </h3>
        <div className="ml-4 xl:text-lg lg:text-base md:text-sm italic">
          <p>
            Currently, only the &apos;Extended streaming history&apos; data is
            supported.
          </p>
          <p>This is a very early build, more features will be added.</p>
          <p>Thank you for checking my app out.</p>
        </div>
      </section>

      {/* upload section */}
      <section className="mt-8">
        <h3 className="xl:text-2xl lg:text-xl md:text-lg font-bold text-spotifygreen">
          Upload your Spotify data:
        </h3>

        <ZipUpload />
      </section>
      <section className="mt-4 text-spotifygreen flex justify-end">
        <p className="text-sm mr-2">
          <span>&copy;</span> Oliver Borg
        </p>
        <a
          href="https://github.com/xahen/spotify-visualizer"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5"
        >
          <FaGithub />
        </a>
      </section>
    </>
  );
};
