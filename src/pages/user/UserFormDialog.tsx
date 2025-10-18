import { useEffect } from "react";
import type { User } from "../../hooks/useUsers"; // ⚠️ type-only import
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormTextField from "../../components/common/FormTextField";
import CommonButton from "../../components/common/CommonButton";
import { useUsers } from "../../hooks/useUsers";

interface Props {
  open: boolean;
  onClose: () => void;
  user?: User;
}

interface FormValues {
  name: string;
  email: string;
  company: string;
}

const UserFormDialog = ({ open, onClose, user }: Props) => {
  const { createUser, updateUser } = useUsers();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          company: user.company?.name || "",
        }
      : { name: "", email: "", company: "" },
  });

  // 🔁 Reset form setiap kali user berubah (misal dari Add → Edit)
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

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      email: data.email,
      company: { name: data.company },
    };

    if (user) {
      updateUser.mutate({ id: user.id, data: payload });
    } else {
      createUser.mutate(payload);
    }

    onClose();
    reset();
  };

  const isLoading = createUser.isPending || updateUser.isPending;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormTextField name="name" label="Name" register={register} />
          <FormTextField name="email" label="Email" register={register} />
          <FormTextField name="company" label="Company" register={register} />
          <DialogActions sx={{ px: 0 }}>
            <CommonButton type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : user ? "Update" : "Create"}
            </CommonButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
