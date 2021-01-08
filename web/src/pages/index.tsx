import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePost } from "../components/createPost";
import { AiOutlineForm } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

const Index = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  // const [searchResults, setSearchResults] = useState([]);
  // useEffect(() => {
  //   if (postData?.communityPosts) {
  //     const results = postData?.communityPosts.filter((p) =>
  //       p.title.toLowerCase().includes(searchTerm)
  //     );
  //     setSearchResults(results);
  //   }
  // }, [searchTerm, postData?.communityPosts]);
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
        <Button
          size="sm"
          m={{ base: 0, sm: 2 }}
          colorScheme="teal"
          onClick={onToggle}
          rightIcon={<AiOutlineForm />}
        >
          Create Post
        </Button>
      </Flex>

      <CreatePost isOpen={isOpen} onClose={onClose} />
      <Stack></Stack>
    </Layout>
  );
};

export default Index;
