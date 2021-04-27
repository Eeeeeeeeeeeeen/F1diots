import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { formatACCDateTime, formatDateString } from "utils/accDataFormatter";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.RaceDataAPI}/raceData`);
  const data = await res.json();

  return { props: { trackData: data } };
}

export default function Home({ trackData }) {
  const router = useRouter();

  trackData.sort((a, b) => formatACCDateTime(b.id) - formatACCDateTime(a.id));

  const handleClick = (id) => {
    router.push(`/race/${id}`);
  };

  return (
    <Table variant="simple" size="md" width="750px" m="0 auto">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Track</Th>
          <Th>Session Type</Th>
        </Tr>
      </Thead>
      <Tbody>
        {trackData.map(({ id, sessionType, trackName }) => (
          <Tr
            key={id}
            cursor="pointer"
            _hover={{ background: "orange.700" }}
            data-id={id}
            data-blah={"id"}
            onClick={() => handleClick(id)}
          >
            <Td>{formatDateString(id)}</Td>
            <Td textTransform="capitalize">{trackName.split("_").join(" ")}</Td>
            <Td>{sessionType}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
