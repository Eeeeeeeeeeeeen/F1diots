const hasuraAdminSecret = process.env.HasuraAdminSecret
const hasuraEndpoint = process.env.HasuraEndpoint

async function fetchGraphQL(operationsDoc, operationName, variables) {
  console.log(hasuraEndpoint)
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
          lap(order_by: {lap_time: asc, driver: {}}, where: {valid_for_best: {_eq: true}}) {
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

  
  export function fetchSessions(offset=0,limit=10) {
    const operationsDoc = `query SessionQuery {
        session(limit: ${limit}, offset: ${offset}) {
          id
          session_type
          timestamp
          track_name
        }
      }`
      
    return fetchGraphQL(
      operationsDoc,
      "SessionQuery",
      {}
    );
  }
  
  export function fetchSessionData(sessionId) {
    const operationsDoc = 
    `query SessionQuery {
        session(where: {id: {_eq: "${sessionId}"}}) {
          id
          session_type
          timestamp
          track_name
          wet
          session_leader_board_lines {
            session_leaderboard_line {
              team_name
              car_id
              car_model
              race_number
              session_leaderboard_line_laps {
                lap {
                  driver {
                    first_name
                    last_name
                    player_id
                    short_name
                  }
                  lap_time
                  splits
                  valid_for_best
                }
              }
            }
          }
        }
      }`
      
    return fetchGraphQL(
      operationsDoc,
      "SessionQuery",
      {}
    );
  }