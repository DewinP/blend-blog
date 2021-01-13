import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import NextLink from "next/link";
import { useQueryClient } from "react-query";
interface AuthMenuProps {
  user?: string;
}

export const AuthMenu: React.FC<AuthMenuProps> = ({ user }) => {
  let queryClient = useQueryClient();
  return (
    <Flex>
      <NextLink href="/">
        <Button colorScheme="teal" variant="ghost" size="sm" mr="40px">
          All posts
        </Button>
      </NextLink>
      <NextLink href="/create-post">
        <Button colorScheme="teal" variant="ghost" size="sm" mr="40px">
          Create Post
        </Button>
      </NextLink>
      <Menu>
        <MenuButton as={Button} variant="link" rightIcon={<FiChevronDown />}>
          {user}
        </MenuButton>
        <MenuList>
          <NextLink href="/">
            <MenuItem
              minH="40px"
              fontWeight="bold"
              onClick={() => {
                localStorage.clear();
                queryClient.clear();
              }}
            >
              <FiLogOut />
              Logout
            </MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    </Flex>
  );
};
