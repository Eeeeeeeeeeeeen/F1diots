import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { calulateLapTime as calculateLapTime } from "../../utils/timeFormatter";
import { fetchSessionData } from "../../utils/dataFetcher";
import { sessionType } from "utils/accDataFormatter";

export async function getServerSideProps(context) {
  const res = await fetchSessionData(context.params.id);

  return { props: { raceData: res.data } };
}

export default function Race({ raceData }) {
  const driverData = raceData.driver;

  var fastestSessionLap = { driver: "", time: 10000000 };
  driverData.forEach((driver) => {
    driver.laps = raceData.lap.filter(
      (lap) => lap.driver.player_id === driver.player_id
    );
    var fastestLapIndex = 0;

    driver.laps.forEach((lap, index) => {
      fastestLapIndex =
        lap.lap_time < driver.laps[fastestLapIndex].lap_time
          ? index
          : fastestLapIndex;

      fastestSessionLap =
        lap.lap_time < fastestSessionLap.time
          ? {
              driver: `${driver.first_name[0]}. ${driver.last_name}`,
              time: lap.lap_time,
            }
          : fastestSessionLap;
    });

    driver.laps[fastestLapIndex].fastest = true;
  });

  const fastestColor = (lapTime, fastest) => {
    if (!fastest) {
      return "";
    }

    if (lapTime == fastestSessionLap.time) {
      return "purple.300";
    } else {
      return "green.300";
    }
  };

  return (
    <Container maxW="750px" mt="20px">
      <Heading textTransform={"capitalize"} mb={5}>
        {sessionType(raceData.session[0].session_type)} -{" "}
        {raceData.session[0].track_name.split("_").join(" ")}
      </Heading>
      <Heading as="h3" size="md">
        Session Fastest Time: {fastestSessionLap.driver} -{" "}
        {calculateLapTime(fastestSessionLap.time)}
      </Heading>
      <Tabs mb="20px" isFitted colorScheme="orange">
        <TabList>
          {raceData.driver.map((driver) => (
            <Tab key={`${driver.short_name}-${driver.player_id}`}>
              {driver.short_name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {raceData.driver.map((driver) => (
            <TabPanel key={driver.player_id}>
              <Heading as="h2" size="lg">
                {`${driver.first_name}`} {`${driver.last_name}`}
              </Heading>
              <Table mb="40px">
                <Thead>
                  <Tr>
                    <Th>Lap No.</Th>
                    <Th>Split 1</Th>
                    <Th>Split 2</Th>
                    <Th>Split 3</Th>
                    <Th>LapTime</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {raceData.lap
                    .filter((lap) => lap.driver.player_id === driver.player_id)
                    .map((lap, index) => (
                      <Tr
                        key={lap.lap_time}
                        color={fastestColor(lap.lap_time, lap.fastest)}
                      >
                        <Td>{index + 1}</Td>
                        {lap.splits.split(",").map((split) => (
                          <Td key={split}>{calculateLapTime(split)}</Td>
                        ))}
                        <Td fontWeight="bold">
                          {calculateLapTime(lap.lap_time)}
                        </Td>
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
