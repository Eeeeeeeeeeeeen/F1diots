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
  return (
    <Container maxW="750px" mt="20px">
      <Tabs mb="20px" isFitted colorScheme="orange">
        <TabList>
          {raceData.driver.map((driver) => (
            <Tab>{driver.short_name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {raceData.lap.map((lap) => (
            <TabPanel>
              <Heading as="h2" size="lg">
                {`${lap.driver.first_name}`} {`${lap.driver.last_name}`}
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
                  <Tr key={lap.lap_time}>
                    <Td fontWeight="bold">{calulateLapTime(lap.lap_time)}</Td>
                    {lap.splits.split(",").map((split) => (
                      <Td>{calulateLapTime(split)}</Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
