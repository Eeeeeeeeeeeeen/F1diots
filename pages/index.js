export async function getServerSideProps(context) {
  const res = await fetch( 'https://127.0.0.1/api/raceData');
  const data = await res.json();
  return { props: { TrackSessionData: data } };
}

export default function Home({ TrackSessionData }) {
  return (
    <div>
      <div className="text-3xl flex mx-2 md:mx-auto my-10 max-w-2xl">
        HomePage
      </div>
      {TrackSessionData.resources.map(({ id, sessionType, trackName }) => (
        <div key={id}>
          {sessionType} @ {trackName}
        </div>
      ))}
    </div>
  );
}
