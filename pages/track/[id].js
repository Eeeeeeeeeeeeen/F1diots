import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { calulateLapTime } from "../../utils/timeFormatter";
import { fetchDriverBestTimes } from "../../utils/dataFetcher";

export async function getServerSideProps(context) {
  const res = await fetchDriverBestTimes(context.params.id);
  const drivers = res.data.driver.filter((d) => {
    return d.laps.length > 0
  })
  const best_laps = drivers.sort((a, b) => a.laps[0].lap_time < b.laps[0].lap_time ? - 1 : 1)  
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
            <Tr key={l.laps[0].lap_time}>
              <Td fontWeight="bold">{calulateLapTime(l.laps[0].lap_time)}</Td>
              <Td>{l.first_name} {l.last_name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}
