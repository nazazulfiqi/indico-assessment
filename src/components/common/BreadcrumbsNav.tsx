import { Breadcrumbs, Link, Typography, Box } from "@mui/material";

interface Props {
  paths: string[];
}

const BreadcrumbsNav = ({ paths }: Props) => {
  const last = paths[paths.length - 1];

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        {paths.slice(0, -1).map((path, i) => (
          <Link
            key={i}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer", fontSize: 14 }}
          >
            {path}
          </Link>
        ))}
        <Typography color="text.primary" fontSize={14}>
          {last}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;
