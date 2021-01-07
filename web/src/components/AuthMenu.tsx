import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";

interface AuthMenuProps {}

export const AuthMenu: React.FC<AuthMenuProps> = ({}) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="link" rightIcon={<FiChevronDown />}>
        user.username
      </MenuButton>
      <MenuList>
        <MenuItem minH="40px" fontWeight="bold">
          My Profile
        </MenuItem>
        <MenuItem minH="40px" fontWeight="bold">
          User Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem minH="40px" fontWeight="bold">
          <FiLogOut />
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
