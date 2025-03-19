import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextField, Typography, Box } from "@mui/material";

interface FormTextFieldProps {
  name: string;
  label: string;
  type?: string;
  [x: string]: any;
}

const FormTextField: React.FC<FormTextFieldProps> = ({ name, label, type = "text", ...props }) => {
  return (
    <Box m={1}> 
      <Field
        as={TextField}
        name={name}
        label={label}
        type={type}
        fullWidth
        size="small"
        {...props}
      />
      <ErrorMessage name={name}>
        {(msg) => <Typography color="error" variant="caption">{msg}</Typography>}
      </ErrorMessage>
    </Box>
  );
};

export default FormTextField;
