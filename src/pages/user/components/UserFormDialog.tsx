import { useEffect } from "react";
import type { User } from "../../../types/user";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "../../../components/common/FormTextField";
import CommonButton from "../../../components/common/CommonButton";
import { useUsers } from "../../../hooks/useUsers";
import { toast } from "react-toastify";
import {
  userSchema,
  type UserSchema,
} from "../../../validators/user.validator";
import { Business, Email, Person } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
  user?: User;
}

const UserFormDialog = ({ open, onClose, user }: Props) => {
  const { createUser, updateUser } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          company: user.company?.name || "",
        }
      : { name: "", email: "", company: "" },
  });

  // Reset form setiap kali user berubah
  useEffect(() => {
    reset(
      user
        ? {
            name: user.name,
            email: user.email,
            company: user.company?.name || "",
          }
        : { name: "", email: "", company: "" }
    );
  }, [user, reset]);

  const onSubmit = (data: UserSchema) => {
    const payload = {
      name: data.name,
      email: data.email,
      company: { name: data.company },
    };

    if (user) {
      // Update User
      updateUser.mutate(
        { id: user.id, data: payload },
        {
          onSuccess: () => {
            toast.success(`User "${data.name}" updated successfully!`);
            onClose();
            reset();
          },
          onError: (error: any) => {
            toast.error(
              `Failed to update user: ${error?.message || "Unknown error"}`
            );
          },
        }
      );
    } else {
      // Create User
      createUser.mutate(payload, {
        onSuccess: () => {
          toast.success(`User "${data.name}" created successfully!`);
          onClose();
          reset();
        },
        onError: (error: any) => {
          toast.error(
            `Failed to create user: ${error?.message || "Unknown error"}`
          );
        },
      });
    }
  };

  const isLoading = createUser.isPending || updateUser.isPending;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1, fontWeight: "bold", fontSize: "1.5rem" }}>
        {user ? "Edit User" : "Add User"}
      </DialogTitle>
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {user
            ? "Update user details below."
            : "Fill in the form to add a new user."}
        </Typography>
      </Box>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormTextField
            name="name"
            label="Name"
            register={register}
            errorObj={errors.name}
            startIcon={<Person />}
          />
          <FormTextField
            name="email"
            label="Email"
            type="email"
            register={register}
            errorObj={errors.email}
            startIcon={<Email />}
          />
          <FormTextField
            name="company"
            label="Company"
            register={register}
            errorObj={errors.company}
            startIcon={<Business />}
          />

          <DialogActions sx={{ px: 0, pt: 2 }}>
            <CommonButton
              onClick={onClose}
              variant="outlined"
              color="inherit"
              disabled={isLoading}
            >
              Cancel
            </CommonButton>
            <CommonButton
              type="submit"
              disabled={isLoading}
              sx={{ bgcolor: user ? "#f1c40f" : "#0276aa" }}
              loading={isLoading}
            >
              {isLoading ? "Saving..." : user ? "Update" : "Create"}
            </CommonButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
