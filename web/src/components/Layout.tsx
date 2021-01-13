import { Flex } from "@chakra-ui/react";
import React from "react";
import { Body } from "./Body";
import { Navbar } from "./Navbar";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Flex justify="center">
        <Body>{children}</Body>
      </Flex>
    </>
  );
};
