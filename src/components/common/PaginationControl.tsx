import { Stack, IconButton, Typography, useMediaQuery } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import CommonButton from "./CommonButton";
import { useTheme } from "@mui/material/styles";

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

const PaginationControl = ({
  totalPages,
  currentPage,
  onChange,
  totalItems,
  pageSize,
}: Props) => {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isSmall ? "column" : "row"}
      spacing={isSmall ? 1 : 2}
      alignItems={isSmall ? "flex-start" : "center"}
      justifyContent="space-between"
      mt={3}
    >
      {/* Info text */}
      <Typography variant="body2" color="text.secondary">
        Menampilkan {start}–{end} dari {totalItems} entri
      </Typography>

      {/* Pagination buttons */}
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent="flex-end"
      >
        <IconButton
          size="small"
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
          sx={{ color: "text.secondary" }}
        >
          <ChevronLeft fontSize="small" />
        </IconButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <CommonButton
            key={i}
            onClick={() => onChange(i + 1)}
            variant={i + 1 === currentPage ? "contained" : "outlined"}
            size="small"
            sx={{
              minWidth: 32,
              height: 28,
              fontSize: "0.75rem",
              padding: "2px 6px",
            }}
          >
            {i + 1}
          </CommonButton>
        ))}

        <IconButton
          size="small"
          disabled={currentPage === totalPages}
          onClick={() => onChange(currentPage + 1)}
          sx={{ color: "text.secondary" }}
        >
          <ChevronRight fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default PaginationControl;
