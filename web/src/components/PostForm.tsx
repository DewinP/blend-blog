import { Stack, Button, Flex, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { UseMutateAsyncFunction } from "react-query";
import { IPost, IPostInput, IPostResponse } from "../interfaces";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";
import { useRouter } from "next/router";

interface PostProps {
  post?: IPost;
  postMutation: UseMutateAsyncFunction<
    IPostResponse,
    unknown,
    IPostInput,
    unknown
  >;
}

export const PostForm: React.FC<PostProps> = ({ post, postMutation }) => {
  let router = useRouter();
  let defaulTitle = "";
  let defaultBody = "";
  if (post) {
    defaulTitle = post.title;
    defaultBody = post.body;
  }
  return (
    <Stack justify="center" align="center">
      <Formik
        initialValues={{ title: defaulTitle, body: defaultBody }}
        onSubmit={async (values, { setErrors }) => {
          const data = await postMutation({
            title: values.title,
            body: values.body,
            id: post?.id,
          });
          console.log(data);
          if (data.post) {
            router.push(`/posts/${data.post.id}`);
          } else if (data.errors) {
            setErrors(toErrorMap(data.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={2}>
              <Flex justify="flex-end" w="100%">
                <Button
                  bgColor="tomato"
                  color="white"
                  size="sm"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </Flex>
              <InputField
                name="title"
                placeholder="Post title..."
                label={post ? "Update post" : "Create post"}
              />
              <Box mt={4}>
                <InputField name="body" placeholder="body" textarea />
              </Box>
              <Button
                mt="20px"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                {post ? "UPDATE POST" : " CREATE POST"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
