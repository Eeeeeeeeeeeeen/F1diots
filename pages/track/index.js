import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useRouter } from "next/router";
import { fetchTracks } from "../../utils/dataFetcher";

export async function getServerSideProps(context) {
    const tracks = await fetchTracks();
    return { props: { tracks: tracks.data.session } };
}

export default function Home({ tracks }) {
  const router = useRouter();
  

  const handleTrackClick = (id) => {
    console.log(id);
    router.push(`/track/${id}`);
  };

  return (
    <Table variant="simple" size="md" width="750px" m="0 auto">
      <Thead>
        <Tr>
          <Th>Track</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tracks.map((track) => (
          <Tr
            key={track.track_name}
            cursor="pointer"
            _hover={{ background: "orange.700" }}
            data-id={track.track_name}
            data-blah={"id"}
            onClick={() => handleTrackClick(track.track_name)}
          >
            <Td textTransform="capitalize">{track.track_name.split("_").join(" ")}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
