import { Flex } from "@chakra-ui/react";
import React from "react";
import { Body } from "./Body";
import { Navbar } from "./Navbar";
interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Flex justify="center">
        <Body>{children}</Body>
      </Flex>
    </>
  );
};
