import { useQuery } from "react-query";
import React from "react";
import { meQuery } from "../api/authApi";
import { Layout } from "../components/Layout";
import { UserContext } from "../context";
import { IContextType } from "../interfaces";
import { PostPreview } from "../components/PostPreview";
import { userPosts } from "../api/userApi";

export const myPosts: React.FC<{}> = ({}) => {
  const { data, isLoading } = useQuery("me", meQuery);
  console.log(data);
  if (isLoading) {
    <Layout>isloading</Layout>;
  }

  return (
    <Layout>
      {data?.posts.map((p) => (
        <PostPreview key={p.id} p={p} />
      ))}
    </Layout>
  );
};

export default myPosts;
