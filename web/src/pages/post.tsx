import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { createNewPost } from "../api/postApi";
import { Layout } from "../components/Layout";
import { PostForm } from "../components/PostForm";
import { IPostInput } from "../interfaces";

const post: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation(createNewPost);

  const onFormSubmit = async (data: IPostInput) => {
    let post = await mutateAsync(data);
    console.log(post);
    router.push("/");
  };

  return (
    <Layout>
      <PostForm onFormSubmit={onFormSubmit} isLoading={isLoading} />
    </Layout>
  );
};
export default post;
