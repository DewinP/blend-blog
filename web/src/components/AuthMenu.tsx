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

interface AuthMenuProps {
  user: string;
}

export const AuthMenu: React.FC<AuthMenuProps> = ({ user }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="link" rightIcon={<FiChevronDown />}>
        {user}
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
