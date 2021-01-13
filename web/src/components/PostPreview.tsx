import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IPost } from "../interfaces";
import { sinceDate } from "../utils/Dates";
import { TiEdit, TiDelete } from "react-icons/ti";
import NextLink from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { deleteById } from "../api/postApi";

interface PostPreviewProps {
  p: IPost;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ p, userPosts }) => {
  let queryClient = useQueryClient();
  let isOwner = userPosts?.find((post) => {
    return post.id === p.id;
  });
  let { mutate: deletePost } = useMutation(deleteById);

  return (
    <Stack
      p="10px"
      borderRadius="8px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
    >
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
          {isOwner ? (
            <Stack>
              <NextLink href={`/posts/edit/${p.id}`}>
                <IconButton
                  aria-label="edit options"
                  bgColor="teal"
                  size="sm"
                  icon={<TiEdit size="15px" />}
                />
              </NextLink>
              <IconButton
                aria-label="remove options"
                size="sm"
                icon={<TiDelete color="red" size="20px" />}
                onClick={() =>
                  deletePost(p.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries("posts");
                    },
                  })
                }
              />
            </Stack>
          ) : null}
        </Flex>
        <Box>
          <NextLink href={`/posts/${p.id}`}>
            <Button size="xl" variant="link">
              {p.title}
            </Button>
          </NextLink>
        </Box>
        <Text>{p.body}</Text>
      </Stack>
      <Flex></Flex>
    </Stack>
  );
};
