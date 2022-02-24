import { Box, Stack, StackDivider, Link, SimpleGrid } from '@chakra-ui/react'

export default function Footer() {
  return (
<Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
    <Stack borderTop="1px" borderColor="red.200" spacing="10" divider={<StackDivider />}>
      <SimpleGrid columns={2}>
        <Box/>
        <Box align="right">
          <Stack margin="8px">
            <Link href="/track">Track Leaderboards</Link>
            <Link href="/">Sessions</Link>
          </Stack>
        </Box>
      </SimpleGrid>
    </Stack>
  </Box>
  )
}