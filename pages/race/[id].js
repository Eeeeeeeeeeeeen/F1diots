import { Container, Heading } from "@chakra-ui/layout";
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
  const drivers = [];
  raceData.sessionResult.leaderBoardLines.map(
    ({ car, currentDriver, timing }) =>
      drivers.push([
        `${currentDriver.firstName[0]}. ${currentDriver.lastName}`,
        car,
        raceData.laps.filter((lap) => lap.carId === car.carId),
        timing.bestLap,
      ])
  );

  return (
    <Container maxW="750px" mt="20px">
      {drivers.map((driver) => (
        <>
          <Heading as="h2" size="lg">
            {`${driver[0]} - ${driver[1].carDetails.name}`}
          </Heading>
          <Table mb="40px">
            <Thead>
              <Tr>
                <Th>LapTime</Th>
                <Th>Split 1</Th>
                <Th>Split 2</Th>
                <Th>Split 3</Th>
              </Tr>
            </Thead>
            <Tbody>
              {driver[2].map((l) => (
                <Tr
                  key={l.laptime}
                  backgroundColor={l.laptime === driver[3] ? "orange.800" : ""}
                >
                  <Td fontWeight="bold">{calulateLapTime(l.laptime)}</Td>

                  {l.splits.map((split) => (
                    <Td>{calulateLapTime(split)}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ))}
    </Container>
  );
}
