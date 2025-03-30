import { ZipUpload } from "@/app/components/upload";
export const WelcomePage = () => {
  return (
    <>
      {/* introduction */}
      <section>
        <h1 className="text-4xl font-bold text-spotifygreen">
          Welcome to the Spotify data visualizer site!
        </h1>

        <h2 className="mt-2 text-2xl italic">
          This site allows you to graphically visualize your Spotify data.
        </h2>
      </section>

      {/* features */}
      <section className="mt-4">
        <p className="text-lg font-bold text-spotifygreen">Features include:</p>
        <ul className="text-base list-disc ml-8 marker:text-spotifygreen">
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
        <h3 className="text-2xl font-bold text-spotifygreen">
          How to get started:
        </h3>

        <div className="mt-2 ml-4">
          <h4 className="text-lg font-bold text-spotifygreen">First</h4>
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

          <h4 className="mt-2 text-lg font-bold text-spotifygreen">Second</h4>
          <p>
            Upload the &apos;.zip&apos; files that you downloaded from Spotify
            to this website.
          </p>
          <p>
            You can select and upload your Spotify data a little further down on
            this page.
          </p>

          <h4 className="mt-2 text-lg font-bold text-spotifygreen">Third</h4>
          <p>
            Enjoy going through a beautiful and nostalgic trip of your listening
            habits!
          </p>
        </div>
      </section>

      {/* upload section */}
      <section className="mt-8">
        <h3 className="text-2xl font-bold text-spotifygreen">
          Upload your Spotify data:
        </h3>

        <ZipUpload />
      </section>
    </>
  );
};
