import { Stack, IconButton, Typography, useMediaQuery } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import CommonButton from "./CommonButton";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";

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
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const start = useMemo(
    () => (totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1),
    [currentPage, pageSize, totalItems]
  );

  const end = useMemo(
    () => Math.min(currentPage * pageSize, totalItems),
    [currentPage, pageSize, totalItems]
  );

  const pageNumbers = useMemo(() => {
    return Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <Stack
      direction={isSmall ? "column" : "row"}
      spacing={isSmall ? 1 : 2}
      alignItems={isSmall ? "flex-start" : "center"}
      justifyContent="space-between"
      mt={3}
    >
      <Typography variant="body2" color="text.secondary">
        {totalItems > 0
          ? `Menampilkan ${start}–${end} dari ${totalItems} entri`
          : "Tidak ada data"}
      </Typography>

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

        {pageNumbers.map((pageNum) => (
          <CommonButton
            key={`page-${pageNum}`}
            onClick={() => onChange(pageNum)}
            variant={pageNum === currentPage ? "contained" : "outlined"}
            size="small"
            color="info"
            sx={{
              minWidth: 32,
              height: 28,
              fontSize: "0.75rem",
              padding: "2px 6px",
            }}
          >
            {pageNum}
          </CommonButton>
        ))}

        <IconButton
          size="small"
          disabled={currentPage === totalPages || totalPages === 0}
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
