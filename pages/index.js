import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/raceData", fetcher);

  if (error) return "An error has occured";
  if (!data) return "Loading";
  return (
    <div>
      <div className="text-3xl flex mx-2 md:mx-auto my-10 max-w-2xl">
        HomePage
      </div>
      {data.resources.map(({ id, sessionType, trackName }) => (
        <div key={id}>
          {sessionType} @ {trackName}
        </div>
      ))}
    </div>
  );
}
