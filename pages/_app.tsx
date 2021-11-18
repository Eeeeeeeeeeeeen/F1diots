import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, NormalizeCSS, GlobalStyles } from "@mantine/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>F1diots</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
          headings: {
            sizes: {
              h1: {
                fontSize: 72,
              },
            },
          },
        }}
      >
        <NormalizeCSS />
        <GlobalStyles />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
