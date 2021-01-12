import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  size: _,
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} width={300}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      {textarea ? (
        <Textarea
          {...field}
          placeholder={props.placeholder}
          id={field.name}
          maxH="200px"
        />
      ) : (
        <Input {...field} {...props} id={field.name} />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
