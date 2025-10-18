import type { User } from "../../hooks/useUsers";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <BreadcrumbsNav
          paths={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "User Management", href: "/users" },
          ]}
        />
      </div>

      {/* Header Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <Typography variant="h6" fontWeight={600}>
            User Management
          </Typography>
        </div>

        {/* Search + Add Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            fullWidth
            sx={{ maxWidth: { xs: "100%", sm: 300 } }}
            placeholder="Search by name..."
          />

          <CommonButton
            onClick={handleAdd}
            startIcon={<Add />}
            color="info"
            sx={{
              width: { xs: "100%", sm: "auto" }, // full di mobile, auto di tablet/desktop
              minWidth: 120, // optional, supaya tidak terlalu kecil
            }}
          >
            Add User
          </CommonButton>
        </div>

        {/* Table Section with MUI - Horizontal Scroll */}
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
                  <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                    Company
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ whiteSpace: "nowrap", fontWeight: 600 }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedUsers.length > 0 ? (
                  pagedUsers.map((user: User) => (
                    <TableRow key={user.id} hover>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {user.id}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {user.name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {user.email}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {user.company?.name || "-"}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {/* Edit Button */}
                          <IconButton
                            onClick={() => handleEdit(user)}
                            size="small"
                            sx={{
                              bgcolor: "#f1c40f", // kuning
                              color: "#fff", // icon putih
                              borderRadius: 1, // rounded kecil, kotak
                              width: 28,
                              height: 28,
                              "&:hover": {
                                bgcolor: "#d4ac0d",
                              },
                              p: 0, // padding nol supaya kotak kompak
                            }}
                          >
                            <Edit fontSize="inherit" sx={{ fontSize: 16 }} />
                          </IconButton>

                          {/* Delete Button */}
                          <IconButton
                            onClick={() => handleDelete(user.id)}
                            size="small"
                            sx={{
                              bgcolor: "#e74c3c", // merah
                              color: "#fff",
                              borderRadius: 1,
                              width: 28,
                              height: 28,
                              "&:hover": {
                                bgcolor: "#c0392b",
                              },
                              p: 0,
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

        {/* Pagination */}
        <div className="mt-4">
          <PaginationControl
            totalPages={totalPages}
            currentPage={page}
            onChange={setPage}
            totalItems={filteredUsers.length}
            pageSize={PAGE_SIZE}
          />
        </div>

        {/* Form Dialog */}
        <UserFormDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          user={selectedUser}
        />
      </div>
    </div>
  );
};

export default UserListPage;
