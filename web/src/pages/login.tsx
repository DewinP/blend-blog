import { Input } from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  Button,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { UserFormData } from "../../types";
import { Login } from "../api/authApi";
import { Layout } from "../components/Layout";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const { register, handleSubmit, formState } = useForm<UserFormData>();
  let { mutate: loginUser } = useMutation(Login);
  const onSubmit = handleSubmit(async (data: UserFormData) => {
    try {
      let user = await loginUser(data);
      console.log(user);
    } catch (e) {}
  });
  return (
    <Layout>
      <Flex justify="center">
        <form onSubmit={onSubmit}>
          <FormControl>
            <Stack spacing={3} w="500px">
              <Box>
                <FormLabel htmlFor="login-email">Email</FormLabel>
                <Input name="email" placeholder="email" ref={register} />
              </Box>
              <Box>
                <FormLabel htmlFor="login-password">Password</FormLabel>
                <Input
                  name="password"
                  id="password-login"
                  placeholder="password"
                  type="password"
                  ref={register}
                />
              </Box>
            </Stack>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Flex>
    </Layout>
  );
};

export default login;
