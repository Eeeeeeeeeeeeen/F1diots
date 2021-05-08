import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { calulateLapTime } from "../../utils/timeFormatter";
import { fetchSessionData } from "../../utils/dataFetcher";

export async function getServerSideProps(context) {
  const res = await fetchSessionData(context.params.id);
  console.log(res.data)

  return { props: { raceData: res.data } };
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
      <Tabs mb="20px" isFitted colorScheme="orange">
        <TabList>
          {drivers.map((driver) => (
            <Tab>{driver[0]}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {drivers.map((driver) => (
            <TabPanel>
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
                      backgroundColor={
                        l.laptime === driver[3] ? "orange.800" : ""
                      }
                    >
                      <Td fontWeight="bold">{calulateLapTime(l.laptime)}</Td>

                      {l.splits.map((split) => (
                        <Td>{calulateLapTime(split)}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
