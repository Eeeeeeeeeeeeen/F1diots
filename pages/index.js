import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { formatACCDateTime } from "utils/accDataFormatter";

export async function getStaticProps(context) {
  const res = await fetch("https://f1diots-backend.herokuapp.com/raceData");
  const data = await res.json();

  return { props: { trackData: data } };
}

function formatDateString(id) {
  const dt = formatACCDateTime(id);

  const year = dt.getFullYear().toString().substring(2);
  const month = dt.getMonth();
  const day = dt.getDate();

  const hour = dt.getHours().toString();
  const minutes = dt.getMinutes().toString();

  return `${day}/${month}/${year} ${hour.length > 1 ? hour : "0" + hour}:${
    minutes.length > 1 ? minutes : "0" + minutes
  }`;
}

export default function Home({ trackData }) {
  trackData.sort((a, b) => formatACCDateTime(b.id) - formatACCDateTime(a.id));

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
          <Tr key={id}>
            <Td>{formatDateString(id)}</Td>
            <Td textTransform="capitalize">{trackName.replace("_", " ")}</Td>
            <Td>{sessionType}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
