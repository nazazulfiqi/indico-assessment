import { Button, CircularProgress } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { ButtonProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";

interface CommonButtonProps extends ButtonProps {
  loading?: boolean;
  to?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  loading = false,
  disabled,
  to,
  type = "button",
  fullWidth = true,
  size = "medium",
  variant = "contained",
  color = "primary",
  sx = {},
  ...rest
}) => {
  const commonStyles: SxProps<Theme> = {
    py: 1,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    lineHeight: 1.4,
    minHeight: 40,
  };

  const component = to ? RouterLink : "button";

  return (
    <Button
      component={component as any}
      to={to}
      type={to ? undefined : type}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      sx={{ ...commonStyles, ...sx }}
      {...rest}
    >
      {loading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  );
};

export default CommonButton;
