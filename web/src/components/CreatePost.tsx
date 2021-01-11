import {
  Button,
  Divider,
  Flex,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

interface CreatePostProps {}

export const CreatePost: React.FC<CreatePostProps> = ({}) => {
  return (
    <Stack p="10px" bgColor="grenish" borderRadius="8px" spacing="1">
      <Input fontWeight="bold" placeholder="Post title..." bgColor="white" />
      <Textarea
        bgColor="white"
        w="100p%"
        placeholder="Write a post..."
      ></Textarea>
      <Divider />
      <Flex justify="flex-end">
        <Button h="35px" mr="30px">
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
