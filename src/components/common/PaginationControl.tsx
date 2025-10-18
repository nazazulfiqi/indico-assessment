import {
  Stack,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { ChevronLeft, ChevronRight, MoreHoriz } from "@mui/icons-material";
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

  const visiblePages = useMemo(() => {
    if (totalPages === 0) return [1];

    const delta = 2;
    const pages: (number | "ellipsis")[] = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("ellipsis");
    }

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <Stack
      direction={isSmall ? "column" : "row"}
      spacing={isSmall ? 1 : 2}
      alignItems={isSmall ? "flex-start" : "center"}
      justifyContent="space-between"
      mt={3}
      sx={{ width: "100%" }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: "0.7rem",
          width: "100%",
          textAlign: isSmall ? "center" : "left",
        }}
      >
        {totalItems > 0
          ? `Menampilkan ${start}–${end} dari ${totalItems} entri`
          : "Tidak ada data"}
      </Typography>

      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={{
          mt: isSmall ? 1 : 0,
          justifyContent: isSmall ? "center" : "flex-end",
          width: "100%",
        }}
      >
        <IconButton
          size="small"
          disabled={currentPage === 1 || totalItems === 0}
          onClick={() => onChange(currentPage - 1)}
          sx={{ color: "text.secondary" }}
        >
          <ChevronLeft fontSize="small" />
        </IconButton>

        {visiblePages.map((page, idx) =>
          page === "ellipsis" ? (
            <IconButton key={`ellipsis-${idx}`} disabled size="small">
              <MoreHoriz fontSize="small" />
            </IconButton>
          ) : (
            <Button
              key={`page-${page}`}
              onClick={() => totalItems > 0 && onChange(page)}
              variant={page === currentPage ? "contained" : "outlined"}
              size="small"
              color="info"
              disabled={totalItems === 0}
              sx={{
                minWidth: 28,
                height: 26,
                fontSize: "0.7rem",
                padding: "0 4px",
                lineHeight: 1,
              }}
            >
              {page}
            </Button>
          )
        )}

        <IconButton
          size="small"
          disabled={
            currentPage === totalPages || totalPages === 0 || totalItems === 0
          }
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
