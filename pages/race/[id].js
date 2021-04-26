import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { calulateLapTime } from "../../utils/timeFormatter";

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.RaceDataAPI}/raceData/${context.params.id}`
  );
  const data = await res.json();

  return { props: { raceData: data } };
}

export default function Race({ raceData }) {
  return (
    <Table variant="simple" size="md" width="750px" m="0 auto">
      <Thead>
        <Tr>
          <Th>Driver</Th>
          <Th>Best Lap</Th>
        </Tr>
      </Thead>
      <Tbody>
        {raceData.sessionResult.leaderBoardLines.map(
          ({ currentDriver, timing }) => (
            <Tr key={currentDriver.playerId}>
              <Td>
                {currentDriver.firstName} {currentDriver.lastName}
              </Td>
              <Td>{calulateLapTime(timing.bestLap)}</Td>
            </Tr>
          )
        )}
      </Tbody>
    </Table>
  );
}
