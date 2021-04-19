const CosmosClient = require("@azure/cosmos").CosmosClient;

Home.getInitialProps = async function () {
  const endpoint = process.env.CosmosEndpoint;
  const key = process.env.CosmosKey;
  const database = process.env.CosmosDatabase;
  const container = process.env.CosmosContainer;

  const client = new CosmosClient({ endpoint, key });

  const databaseID = client.database(database);
  const containerID = databaseID.container(container);

  if (endpoint) {
    const querySpec = {
      query: "SELECT * FROM c",
    };

    const { resources: items } = await containerID.items
      .query(querySpec)
      .fetchAll();
    return { CosmoData: items };
  }
};

export default function Home({ CosmoData }) {
  return (
    <div>
      <div className="text-3xl flex mx-2 md:mx-auto my-10 max-w-2xl">
        HomePage
      </div>
      {CosmoData.map(({ id, sessionType, trackName }) => (
        <div key={id}>
          {sessionType} & {trackName}
        </div>
      ))}
    </div>
  );
}
