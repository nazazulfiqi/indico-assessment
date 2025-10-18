import { Breadcrumbs, Link, Typography, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  paths: BreadcrumbItem[];
}

const BreadcrumbsNav = ({ paths }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const last = paths[paths.length - 1];

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        {paths.slice(0, -1).map((path, i) => (
          <Link
            key={i}
            underline="hover"
            color="inherit"
            sx={{
              cursor: "pointer",
              fontSize: 14,
              transition: "color 0.2s",
              "&:hover": { color: theme.palette.primary.main },
            }}
            onClick={() => path.href && navigate(path.href)}
          >
            {path.label}
          </Link>
        ))}

        <Typography
          fontSize={14}
          fontWeight={500}
          sx={{ color: theme.palette.primary.main }}
        >
          {last.label}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;
