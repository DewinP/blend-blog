import { Button, Stack, Box, Flex } from "@chakra-ui/react";
import React from "react";

import { Signup } from "../api/authApi";
import { Layout } from "../components/Layout";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";

type FormData = {
  email: string;
  password: string;
  username: string;
};

const signup: React.FC<{}> = ({}) => {
  const { mutateAsync: registerUser } = useMutation(Signup);
  const router = useRouter();
  return (
    <Layout>
      <Flex justify="center">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values: FormData, { setErrors }) => {
            const { errors } = await registerUser(values);
            if (errors) {
              setErrors(toErrorMap(errors));
            } else {
              router.push("/login");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <InputField name="email" placeholder="email" label="Email" />
                <Box>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
              </Stack>
              <Button
                mt="20px"
                w="100%"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                SIGNUP
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default signup;
