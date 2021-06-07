import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { calulateLapTime } from "../../utils/timeFormatter";
import { fetchDriverBestTimes } from "../../utils/dataFetcher";

export async function getServerSideProps(context) {
  const res = await fetchDriverBestTimes(context.params.id);
  const best_laps = res.data.lap.sort((a, b) => a.lap_time < b.lap_time ? - 1 : 1)
  
  return { props: { raceData: best_laps } };
}

export default function Track({ raceData }) {
  return (
    <Container maxW="750px" mt="20px">
      <Table mb="40px">
        <Thead>
          <Tr>
            <Th>LapTime</Th>
            <Th>Driver</Th>
          </Tr>
        </Thead>
        <Tbody>
          {raceData.map((l) => (
            <Tr key={l.lap_time}>
              <Td fontWeight="bold">{calulateLapTime(l.lap_time)}</Td>
              <Td>{l.driver.first_name} {l.driver.last_name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}
