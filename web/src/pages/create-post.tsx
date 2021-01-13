import React from "react";
import { Layout } from "../components/Layout";
import { Flex } from "@chakra-ui/react";
import { createNewPost } from "../api/postApi";
import { useMutation } from "react-query";
import { PostForm } from "../components/PostForm";
import { useIsAuth } from "../utils/isAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const { mutateAsync: createPost } = useMutation(createNewPost);
  useIsAuth();
  return (
    <Layout>
      <Flex justify="center">
        <PostForm postMutation={createPost} />
      </Flex>
    </Layout>
  );
};

export default CreatePost;
