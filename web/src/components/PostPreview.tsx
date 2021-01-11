import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IPost } from "../interfaces";
import { sinceDate } from "../utils/Dates";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
interface PostPreviewProps {
  p: IPost;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ p }) => {
  return (
    <Stack p="10px" bgColor="grenish" borderRadius="8px">
      <Stack>
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Avatar borderRadius="5px" my="10px" mr="10px" />
            <Text fontSize="xs" fontWeight="bold" mr="4px">
              {p.creator.username}
            </Text>
            <Text fontWeight="bold" fontSize="9px" mb="1px" color="grey">
              | {sinceDate(p.createdAt)}
            </Text>
          </Flex>
          <Flex>
            <IconButton
              aria-label="favorite"
              variant="ghost"
              icon={<MdFavoriteBorder size="20px" />}
            />
            <IconButton
              aria-label="edit options"
              variant="ghost"
              colorScheme="transparent"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </Flex>
        <Heading size="md"> {p.title}</Heading>
        <Text>{p.body}</Text>
      </Stack>
      <Flex></Flex>
    </Stack>
  );
};
