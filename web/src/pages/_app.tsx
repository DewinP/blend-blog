import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import UserContextProvider from "../contexts/UserContext";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
