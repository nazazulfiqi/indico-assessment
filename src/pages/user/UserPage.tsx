import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { User } from "../../types/user";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useUsers } from "../../hooks/useUsers";
import CommonButton from "../../components/common/CommonButton";
import UserFormDialog from "./components/UserFormDialog";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import PaginationControl from "../../components/common/PaginationControl";
import { toast } from "react-toastify";
import FormTextField from "../../components/common/FormTextField";
import UserTable from "./components/UserTable";

const PAGE_SIZE = 5;

const UserPage = () => {
  const { usersQuery, deleteUser } = useUsers();
  const users = usersQuery.data || [];

  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    userId: number | null;
    userName: string;
  }>({
    open: false,
    userId: null,
    userName: "",
  });

  useEffect(() => {
    const params: any = {};
    if (search) params.search = search;
    if (page > 1) params.page = page.toString();
    setSearchParams(params, { replace: true });
  }, [search, page, setSearchParams]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setSelectedUser(undefined);
    setOpenForm(true);
  };

  const handleDeleteClick = (user: User) => {
    setDeleteDialog({
      open: true,
      userId: user.id,
      userName: user.name,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.userId) {
      deleteUser.mutate(deleteDialog.userId, {
        onSuccess: () => {
          toast.success(
            `User "${deleteDialog.userName}" deleted successfully!`
          );
        },
        onError: (error: any) => {
          toast.error(
            `Failed to delete user: ${error?.message || "Unknown error"}`
          );
        },
      });
    }
    setDeleteDialog({ open: false, userId: null, userName: "" });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, userId: null, userName: "" });
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <BreadcrumbsNav
          paths={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "User Management", href: "/users" },
          ]}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <Typography variant="h6" fontWeight={600}>
            User Management
          </Typography>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <FormTextField
            name="search"
            label=""
            placeholder="Search by name..."
            size="small"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={{ maxWidth: { xs: "100%", sm: 300 }, mb: 0 }}
            startIcon={
              <Search sx={{ color: "text.secondary", fontSize: 22 }} />
            }
          />
          <CommonButton
            onClick={handleAdd}
            startIcon={<Add />}
            color="info"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: 120,
            }}
          >
            Add User
          </CommonButton>
        </div>

        <UserTable
          users={pagedUsers}
          isLoading={usersQuery.isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        <div className="mt-4">
          <PaginationControl
            totalPages={totalPages}
            currentPage={page}
            onChange={setPage}
            totalItems={filteredUsers.length}
            pageSize={PAGE_SIZE}
          />
        </div>

        <UserFormDialog
          open={openForm}
          onClose={handleFormClose}
          user={selectedUser}
        />

        <Dialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete user{" "}
              <strong>{deleteDialog.userName}</strong>? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleDeleteCancel}
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default UserPage;
