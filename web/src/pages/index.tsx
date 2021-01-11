import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FiSearch } from "react-icons/fi";
import { fetchAllPosts } from "../api/postApi";
import { PostPreview } from "../components/PostPreview";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const { data, isLoading } = useQuery("posts", fetchAllPosts);
  if (isLoading) {
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
          <Input
            placeholder={`Search posts`}
            value={searchTerm}
            onChange={handleChange}
          />
          <InputRightElement p={0} children={<FiSearch />} />
        </InputGroup>
      </Flex>
      <Stack>
        {data?.map((p) => {
          return <PostPreview key={p.id} p={p} />;
        })}
      </Stack>
    </Layout>
  );
};

export default Index;
