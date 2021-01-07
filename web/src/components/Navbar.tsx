import { Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { AuthMenu } from "./AuthMenu";
import { NotAuthMenu } from "./NotAuthMenu";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  let user = false;
  return (
    <Flex
      h="50px"
      boxShadow="0 2px 10px -10px black"
      backgroundColor="white"
      flexDir="row"
      zIndex={2}
      position="sticky"
      top="0"
    >
      <Flex
        w="100%"
        mx={{ base: "10px", lg: "50px" }}
        my="auto"
        justify="space-between"
      >
        <Flex>
          <NextLink href="/">
            <Heading cursor="pointer">Blend-Blog</Heading>
          </NextLink>
        </Flex>
        <Flex align="center">{user ? <AuthMenu /> : <NotAuthMenu />}</Flex>
      </Flex>
    </Flex>
  );
};
