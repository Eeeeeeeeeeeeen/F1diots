import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { mode } from "@chakra-ui/theme-tools";

function Application({ Component, pageProps }) {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "gray.900",
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default Application;
