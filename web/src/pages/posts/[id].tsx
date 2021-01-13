import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { useQuery } from "react-query";
import { postById } from "../../api/postApi";
import { NextPage } from "next";
import { getFromUrl } from "../../utils/getFromUrl";
import { sinceDate } from "../../utils/Dates";
import { useRouter } from "next/router";
import { useIsAuth } from "../../utils/isAuth";

const Post: NextPage = ({}) => {
  let id = getFromUrl();
  useIsAuth();
  const { data } = useQuery(["post", id], () => postById(id));

  return (
    <Layout>
      <Stack>
        {data?.post ? (
          <Stack justify="center">
            <Box>
              <Heading>{data?.post.title}</Heading>
              <Flex>
                <Text>By</Text>
                <Text fontWeight="bold" mx="5px">
                  {data?.post.creator.username}
                </Text>
                <Text>{sinceDate(data.post?.createdAt)}</Text>
              </Flex>
            </Box>
            <Text>{data?.post.body}</Text>
          </Stack>
        ) : (
          <Flex align="center" justify="center" h="80vh">
            <Heading>404: Post does not exist</Heading>
          </Flex>
        )}
      </Stack>
    </Layout>
  );
};
export default Post;
