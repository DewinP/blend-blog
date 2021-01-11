import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { PostFormData } from "../../types";
import { CreateNewPost } from "../api/postApi";
import { useRouter } from "next/router";

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<PostFormData>();
  let { mutate: createPost } = useMutation(CreateNewPost);
  const onSubmit = handleSubmit(async (data: PostFormData) => {
    try {
      let post = createPost(data);
      if (post.id) {
        router.push(`/posts/${post.id}`);
      }
    } catch (e) {}
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={{ md: "800px" }}>
        <ModalHeader>Create a new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex justify="center">
            <form onSubmit={onSubmit}>
              <FormControl>
                <Stack spacing={3} w="500px">
                  <Box>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Title"
                      ref={register}
                    />
                  </Box>
                  <Box>
                    <Textarea name="body" ref={register} />
                  </Box>
                </Stack>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                POST
              </Button>
            </form>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
