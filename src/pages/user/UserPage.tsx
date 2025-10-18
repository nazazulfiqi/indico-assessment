import type { User } from "../../hooks/useUsers";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  Stack,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";
import CommonButton from "../../components/common/CommonButton";
import UserFormDialog from "./UserFormDialog";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import PaginationControl from "../../components/common/PaginationControl";

const PAGE_SIZE = 5;

const UserListPage = () => {
  const { usersQuery, deleteUser } = useUsers();
  const users = usersQuery.data || [];

  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setSelectedUser(undefined);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this user?")) deleteUser.mutate(id);
  };

  // Filter & pagination
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(totalPages);
  }, [totalPages, page]);

  if (usersQuery.isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      {/* Breadcrumb */}
      <div className="bg-white p-4 h-full flex items-center rounded-lg mb-6">
        <BreadcrumbsNav paths={["Dashboard", "User Management"]} />
      </div>

      {/* Header */}
      <div className="bg-white p-4 rounded-lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={600}>
            User Management
          </Typography>
        </Stack>

        {/* Search & Filter */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            fullWidth
            sx={{ maxWidth: { xs: "100%", sm: 300 } }}
          />

          <CommonButton onClick={handleAdd} startIcon={<Add />}>
            Add User
          </CommonButton>
        </Stack>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: 1 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f6fa" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedUsers.map((user: User) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company?.name || "-"}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(user)}
                        size="small"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        sx={{
                          color: "#e74c3c",
                          "&:hover": { backgroundColor: "rgba(231,76,60,0.1)" },
                        }}
                        onClick={() => handleDelete(user.id)}
                        size="small"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <PaginationControl
          totalPages={totalPages}
          currentPage={page}
          onChange={setPage}
          totalItems={filteredUsers.length}
          pageSize={PAGE_SIZE}
        />

        {/* Form Dialog */}
        <UserFormDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          user={selectedUser}
        />
      </div>
    </Box>
  );
};

export default UserListPage;
