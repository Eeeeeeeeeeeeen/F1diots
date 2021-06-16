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

export function fetchDriverBestTimes(track_name) {
    const operationsDoc = `
    query TrackLeaderBoardQuery {
      driver(where: {}) {
        laps(where: {session_leaderboard_line_laps: {session_leaderboard_line: {session_leader_board_lines: {session: {track_name: {_eq: "${track_name}"}}}}, lap: {valid_for_best: {_eq: true}}}, lap_time: {}}, order_by: {lap_time: asc}, limit: 1) {
          lap_time
          session_leaderboard_line_laps {
            session_leaderboard_line {
              car {
                car_class
                name
              }
            }
          }
        }
        first_name
        last_name
        player_id
        short_name
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
        session(limit: ${limit}, offset: ${offset}, order_by: {timestamp: desc}) {
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
    `
    query SessionQuery {
      lap(where: {session_leaderboard_line_laps: {session_leaderboard_line: {session_id: {_eq: "${sessionId}"}}}}) {
        driver {
          player_id
        }
        lap_time
        valid_for_best
        splits
      }
      session(where: {id: {_eq: "${sessionId}"}}) {
        session_type
        timestamp
        track_name
        wet
      }
      driver(where: {laps: {session_leaderboard_line_laps: {session_leaderboard_line: {session_id: {_eq: "${sessionId}"}}}}}) {
        first_name
        last_name
        short_name
        player_id
      }
    }    
    `
      
    return fetchGraphQL(
      operationsDoc,
      "SessionQuery",
      {}
    );
  }

  export function fetchTracks() {
    const operationsDoc = 
    `query TrackQuery {
      session(distinct_on: track_name) {
        track_name
      }
    }` 
    return fetchGraphQL(
      operationsDoc,
      "TrackQuery",
      {}
    );
  }