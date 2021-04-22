import { Flex, Heading } from "@chakra-ui/layout";
import { color } from "@chakra-ui/styled-system";

export default function Header({ title }) {
  return (
    <Flex p={3} borderBottom="2px" borderColor="red.200">
      <Heading as="h3" size="lg" m={1}>
        F1diots
      </Heading>
    </Flex>
  );
}
