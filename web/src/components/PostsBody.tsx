import { Flex, Box, Text, Stack, Heading, Button } from "@chakra-ui/react";
import React from "react";
import { IPost } from "../interfaces";
import { sinceDate } from "../utils/Dates";
import { useRouter } from "next/router";

interface PostBodyProps {
  p: IPost;
}

export const PostBody: React.FC<PostBodyProps> = ({ p }) => {
  const router = useRouter();
  return (
    <Stack justify="center">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        color="tomato"
        size="xs"
      >
        {"< GO BACK"}
      </Button>
      <Box>
        <Heading color="skyblue">{p.title}</Heading>
        <Flex>
          <Text>By</Text>
          <Text fontWeight="bold" mx="5px">
            {p.creator.username}
          </Text>
          <Text>{sinceDate(p.createdAt)}</Text>
        </Flex>
      </Box>
      <Text>{p.body}</Text>
    </Stack>
  );
};
