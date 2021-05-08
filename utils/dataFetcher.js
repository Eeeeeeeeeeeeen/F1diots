const hasuraAdminSecret = process.env.HasuraAdminSecret
const hasuraEndpoint = process.env.HasuraEndpoint

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    hasuraEndpoint,
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
      headers: {
            'x-hasura-admin-secret': hasuraAdminSecret,
            'Content-Type': 'application/json'
      },
    }
  );
  return await result.json();
}

export function fetchTrackLeaderboard(track_name) {
  const operationsDoc = `
      query TrackLeaderBoardQuery {
        lap(order_by: {lap_time: asc, driver: {}}, where: {session_leaderboard_line_laps: {session_leaderboard_line: {session_leader_board_lines: {session: {track_name: {_eq: "${track_name}"}}}}}}, limit: 10) {
          driver_player_id
          id
          lap_time
          driver {
            first_name
            last_name
            player_id
            short_name
          }
        }
      }
    `;
  return fetchGraphQL(
    operationsDoc,
    "TrackLeaderBoardQuery",
    {}
  );
}
