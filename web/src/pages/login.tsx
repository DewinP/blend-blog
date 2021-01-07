import { Input } from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Layout } from "../components/Layout";

interface loginProps {}

type FormData = {
  email: string;
  password: string;
};

const login: React.FC<loginProps> = ({}) => {
  const { register, handleSubmit, formState, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ email, password }) => {
    console.log("email:", email, "password:", password);
  });
  return (
    <Layout>
      <Flex justify="center">
        <form onSubmit={onSubmit}>
          <FormControl>
            <Stack spacing={3} w="500px">
              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input name="email" placeholder="email" ref={register} />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </Box>
              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input name="password" placeholder="password" ref={register} />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </Box>
            </Stack>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            LOGIN
          </Button>
        </form>
      </Flex>
    </Layout>
  );
};

export default login;
