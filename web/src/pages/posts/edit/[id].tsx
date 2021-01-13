import React from "react";
import { useMutation, useQuery } from "react-query";
import { PostForm } from "../../../components/PostForm";
import { Layout } from "../../../components/Layout";
import { getFromUrl } from "../../../utils/getFromUrl";
import { postById, UpdatePost } from "../../../api/postApi";
import { NextPage } from "next";

const EditPost: NextPage = ({}) => {
  let id = getFromUrl();
  const { data, isLoading } = useQuery(["post", id], () => postById(id));
  const { mutateAsync: updatePost } = useMutation(UpdatePost);
  return (
    <Layout>
      {!isLoading && <PostForm post={data?.post} postMutation={updatePost} />}
    </Layout>
  );
};
export default EditPost;
