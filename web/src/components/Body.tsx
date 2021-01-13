import { Box } from "@chakra-ui/react";
import React from "react";
interface BodyProps {}

export const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <Box w="600px" minW="500px" mt={6} top={0}>
      {children}
    </Box>
  );
};
