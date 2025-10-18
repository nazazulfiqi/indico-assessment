import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import type { TextFieldProps } from "@mui/material";
import type { FieldError } from "react-hook-form";

interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label: string;
  type?: string;
  errorObj?: FieldError;
  register?: any;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = "text",
  register,
  errorObj,
  startIcon,
  endIcon,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <TextField
      {...(register ? register(name) : {})}
      label={label}
      type={isPassword && !showPassword ? "password" : "text"}
      fullWidth
      size="small"
      variant="outlined"
      error={!!errorObj}
      helperText={errorObj?.message}
      InputLabelProps={{
        sx: {
          "&.Mui-focused": {
            color: "#000",
          },
        },
      }}
      InputProps={{
        sx: {
          borderRadius: 2,
          fontSize: "0.9rem",
          height: 45,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000",
            borderWidth: 1.5,
          },
        },
        startAdornment: startIcon ? (
          <InputAdornment position="start" sx={{ mr: 0.5 }}>
            <span style={{ fontSize: "1.1rem", color: "#666" }}>
              {startIcon}
            </span>
          </InputAdornment>
        ) : undefined,
        endAdornment: (
          <InputAdornment position="end">
            {isPassword ? (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
                sx={{ color: "#666" }}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            ) : (
              endIcon
            )}
          </InputAdornment>
        ),
      }}
      sx={{ mb: 2 }}
      {...rest}
    />
  );
};

export default FormTextField;
