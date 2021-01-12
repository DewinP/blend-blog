import { Button, Stack, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Form, Formik } from "formik";

import { useMutation } from "react-query";
import { Login } from "../api/authApi";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { UserContext } from "../contexts/UserContext";
import { IContextType } from "../interfaces";
interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  let { mutateAsync: loginUser } = useMutation(Login);
  let router = useRouter();
  const { setUser } = React.useContext(UserContext) as IContextType;
  return (
    <Layout>
      <Flex justify="center">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const { data, errors } = await loginUser(values);
            if (errors) {
              setErrors(toErrorMap(errors));
            } else if (data) {
              setUser(data);
              router.push("/");
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
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                login
                <Button
                  w="100%"
                  mt="20px"
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  LOGIN
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default login;
