import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { formatACCDateTime, formatDateString } from "utils/accDataFormatter";
import { useRouter } from "next/router";
import { fetchSessions } from "../utils/dataFetcher";

export async function getServerSideProps(context) {
  const res = await fetchSessions();

  return { props: { trackData: res.data.session } };
}

export default function Home({ trackData }) {
  const router = useRouter();

  trackData.sort((a, b) => b.timestamp - a.timestamp);

  const handleSessionClick = (id) => {
    router.push(`/race/${id}`);
  };

  const handleTrackClick = (e, id) => {
    e.stopPropagation();
    router.push(`/track/${id}`);
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
        {trackData.map((session) => (
          <Tr
            key={session.id}
            cursor="pointer"
            _hover={{ background: "orange.700" }}
            data-id={session.id}
            data-blah={"id"}
            onClick={() => handleSessionClick(session.id)}
          >
            <Td>{formatDateString(session.id)}</Td>
            <Td textTransform="capitalize" _hover={{ 'textDecoration': 'underline', color: "cyan.400" }} onClick={(e) => handleTrackClick(e, session.track_name)}>{session.track_name.split("_").join(" ")}</Td>
            <Td>{session.session_type}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
