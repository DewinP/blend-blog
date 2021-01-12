import {
  Stack,
  Input,
  Textarea,
  Divider,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { IPostInput } from "../interfaces";

interface PostProps {
  defaultValues?: IPostInput;
  onFormSubmit: (data: IPostInput) => Promise<void>;
  isLoading: boolean;
}

export const PostForm: React.FC<PostProps> = ({
  defaultValues,
  onFormSubmit,
  isLoading,
}) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const onSubmit = handleSubmit((data) => {
    onFormSubmit(data);
  });
  return (
    <Stack p="10px" bgColor="grenish" borderRadius="8px" spacing="1">
      <Input
        ref={register}
        id="title"
        name="title"
        fontWeight="bold"
        placeholder="Post title..."
        bgColor="white"
      />
      <Textarea
        id="body"
        name="body"
        bgColor="white"
        w="100p%"
        placeholder="Write a post..."
      />
      <Divider />
      <Flex justify="flex-end">
        <Button
          h="35px"
          mr="30px"
          isLoading={isLoading ? true : false}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Flex>
    </Stack>
  );
};
