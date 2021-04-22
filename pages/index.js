import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { formatACCDateTime } from "utils/accDataFormatter";

export async function getStaticProps(context) {
  const res = await fetch("https://f1diots-backend.herokuapp.com/raceData");
  const data = await res.json();

  return { props: { trackData: data } };
}

export default function Home({ trackData }) {
  return (
    <Table
      variant="striped"
      colorScheme="orange"
      size="md"
      width="750px"
      m="0 auto"
    >
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Track</Th>
          <Th>Session Type</Th>
        </Tr>
      </Thead>
      <Tbody>
        {trackData.map(({ id, sessionType, trackName }) => (
          <Tr>
            <Td>{formatACCDateTime(id)}</Td>
            <Td textTransform="capitalize">{trackName.replace("_", " ")}</Td>
            <Td>{sessionType}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
