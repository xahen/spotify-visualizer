import { useRouter } from "next/navigation";

export const NoData = () => {
  const router = useRouter();

  return (
    <section className="flex h-screen w-screen">
      <div className="m-auto flex flex-col justify-center">
        <h1 className="text-3xl text-spotifygreen">
          No data has been uploaded...
        </h1>
        <div className="w-full flex mt-2">
          <button
            className="m-auto border-2 border-spotifygreen px-2 py-1 rounded-3xl text-xl hover:bg-white/30"
            onClick={() => router.push("/")}
          >
            Go back
          </button>
        </div>
      </div>
    </section>
  );
};
