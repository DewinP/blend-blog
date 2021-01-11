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
import { Signup } from "../api/authApi";
import { Layout } from "../components/Layout";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { UserFormData } from "../../types";

type FormData = {
  email: string;
  password: string;
};

interface loginProps {}
const signup: React.FC<loginProps> = ({}) => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { mutate: signupUser } = useMutation(Signup);
  const router = useRouter();
  const onSubmit = handleSubmit(async (data: UserFormData) => {
    signupUser(data, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  });
  return (
    <Layout>
      <Flex justify="center">
        <form onSubmit={onSubmit}>
          <FormControl>
            <Stack spacing={3} w="500px">
              <Box>
                <FormLabel htmlFor="userame">Username</FormLabel>
                <Input name="username" placeholder="username" ref={register} />
              </Box>
              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input name="email" placeholder="email" ref={register} />
              </Box>
              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  name="password"
                  id="password"
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
            SIGNUP
          </Button>
        </form>
      </Flex>
    </Layout>
  );
};

export default signup;
