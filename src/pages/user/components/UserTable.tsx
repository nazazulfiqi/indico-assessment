import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { User } from "../../../types/user";

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable = ({ users, isLoading, onEdit, onDelete }: UserTableProps) => {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f5f6fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress size={40} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company?.name || "-"}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        onClick={() => onEdit(user)}
                        size="small"
                        sx={{
                          bgcolor: "#f1c40f",
                          color: "#fff",
                          borderRadius: 1,
                          width: 28,
                          height: 28,
                          "&:hover": { bgcolor: "#d4ac0d" },
                        }}
                      >
                        <Edit fontSize="inherit" sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete(user)}
                        size="small"
                        sx={{
                          bgcolor: "#e74c3c",
                          color: "#fff",
                          borderRadius: 1,
                          width: 28,
                          height: 28,
                          "&:hover": { bgcolor: "#c0392b" },
                        }}
                      >
                        <Delete fontSize="inherit" sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary" py={2}>
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
