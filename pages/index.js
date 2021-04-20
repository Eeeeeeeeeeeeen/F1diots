const axios = require('axios');

Home.getInitialProps = async function () {
  //TODO - check if this is the best way to call the local API
  const result = await axios.get('http://localhost:3000/api/raceData')
  return { TrackSessionData: result.data };
};

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
