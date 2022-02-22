import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { calulateLapTime } from "../../utils/timeFormatter";
import { fetchSessionData } from "../../utils/dataFetcher";
import { sessionType } from "utils/accDataFormatter";

export async function getServerSideProps(context) {
  const res = await fetchSessionData(context.params.id);

  return { props: { raceData: res.data } };
}

export default function Race({ raceData }) {
  return (
    <Container maxW="750px" mt="20px">
      <Heading textTransform={"capitalize"} mb={5}>{sessionType(raceData.session[0].session_type)} - {raceData.session[0].track_name.split("_").join(" ")}</Heading>
      <Tabs mb="20px" isFitted colorScheme="orange">
        <TabList>
          {raceData.driver.map((driver) => (
            <Tab>{driver.short_name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {raceData.driver.map((driver) => (
            <TabPanel>
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
                  {raceData.lap.filter((lap) => lap.driver.player_id === driver.player_id).map((lap, index) => (
                    <Tr key={lap.lap_time}>
                      <Td>{index + 1}</Td>
                      {lap.splits.split(",").map((split) => (
                        <Td>{calulateLapTime(split)}</Td>
                      ))}
                      <Td fontWeight="bold">{calulateLapTime(lap.lap_time)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container >
  );
}
