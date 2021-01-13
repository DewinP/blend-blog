import { Layout } from "../components/Layout";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FiSearch } from "react-icons/fi";
import { fetchAllPosts } from "../api/postApi";
import { PostPreview } from "../components/PostPreview";
import { meQuery } from "../api/authApi";

const Index = () => {
  const { data: allPosts, isLoading: postsIsLoading } = useQuery(
    "posts",
    fetchAllPosts
  );
  const { data: user } = useQuery("me", meQuery);

  if (postsIsLoading) {
    <Layout>
      <Flex justify="center" align="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    </Layout>;
  }

  return (
    <Layout>
      <Flex
        mb={4}
        justify={{ base: "center", md: "space-between" }}
        wrap="wrap"
      >
        <InputGroup size="sm" maxW="400px" m={{ base: 0, sm: 2 }}>
          <Input placeholder={`Search posts`} />
          <InputRightElement p={0} children={<FiSearch />} />
        </InputGroup>
      </Flex>
      <Stack>
        {allPosts?.map((p) => {
          return <PostPreview key={p.id} userPosts={user?.posts} p={p} />;
        })}
      </Stack>
    </Layout>
  );
};

export default Index;
