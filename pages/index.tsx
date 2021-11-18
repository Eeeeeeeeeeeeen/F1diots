import {
  AppShell,
  Center,
  Container,
  Group,
  Header,
  Title,
  Text,
  SimpleGrid,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import f1diotsProd from "../public/F1DIOTS_Pod_Art.png";
import spotifyIcon from "../public/spotify.svg";
import podspaceIcon from "../public/podspace.png";
import appleIcon from "../public/apple-logo.svg";

const HomePage = () => (
  <AppShell
    // header={
    //   <Header height={90} padding="xs">
    //     {/* Header content */}
    //   </Header>
    // }
    styles={(theme) => ({
      main: {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    })}
  >
    <Container>
      <Group direction="column" spacing="xl">
        <Title order={1}>
          Welcome to the home of the{" "}
          <Text
            inherit
            component="span"
            variant="gradient"
            gradient={{ from: "cyan", to: "orange", deg: 45 }}
          >
            F1DIOTS
          </Text>
        </Title>
        <Text>
          The website is currently under construction, but why don't you check
          out the podcast while you wait?
        </Text>
        <Group
          direction="column"
          position="center"
          style={{ margin: "0 auto" }}
        >
          <Image src={f1diotsProd} width="350px" height="350px" />
          <Group position="center" spacing="xl">
            <Link
              href="https://open.spotify.com/show/28IacAlwJ4C6oYjI9OcOUA"
              passHref
            >
              <a>
                <Image src={spotifyIcon} width="100px" height="100px" />
              </a>
            </Link>
            <Link href="https://pod.space/thef1diotspodcast" passHref>
              <a>
                <Image src={podspaceIcon} width="100px" height="100px" />
              </a>
            </Link>
            <Link
              href="https://podcasts.apple.com/podcast/id1593227243?mt=2"
              passHref
            >
              <a>
                <Image src={appleIcon} width="100px" height="100px" />
              </a>
            </Link>
          </Group>
        </Group>
      </Group>
    </Container>
  </AppShell>
);

export default HomePage;
