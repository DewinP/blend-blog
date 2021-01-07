import { Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface NotAuthMenuProps {}

export const NotAuthMenu: React.FC<NotAuthMenuProps> = ({}) => {
  return (
    <>
      <NextLink href="/login">
        <Button marginRight="20px" size="sm" colorScheme="teal">
          LOGIN
        </Button>
      </NextLink>
      <NextLink href="/signup">
        <Button colorScheme="blue" size="sm">
          SIGNUP
        </Button>
      </NextLink>
    </>
  );
};
