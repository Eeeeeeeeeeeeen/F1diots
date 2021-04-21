const CosmosClient = require("@azure/cosmos").CosmosClient;
const NodeCache = require( "node-cache" );

//uncomment for local dev
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const endpoint = process.env.CosmosEndpoint;
const key = process.env.CosmosKey;
const database = process.env.CosmosDatabase;
const container = process.env.CosmosContainer;

const client = new CosmosClient({ endpoint, key });
const databaseID = client.database(database);
const containerID = databaseID.container(container);
const querySpec = {
    query: "SELECT * FROM c",
};

const raceDataCache = new NodeCache();
const sessionDataKey = "session_data"
const sessionDataTTL = 1800 // seconds

export default async function handler(req, res) {
    if(!raceDataCache.has( sessionDataKey )){
        console.log("Missed cache, calling DB")
        const dbResult = await containerID.items.query(querySpec).fetchAll()
        raceDataCache.set( sessionDataKey, dbResult, sessionDataTTL );
    }
    const raceData = raceDataCache.get(sessionDataKey)
    res.status(200).json(raceData)
}