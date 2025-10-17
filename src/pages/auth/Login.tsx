import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../../validators/auth.validator";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    const success = login(data.email, data.password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4"
      sx={{
        backgroundColor: "#fafafa",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          overflow: "hidden",
          bgcolor: "white",
        }}
      >
        {/* Left: Illustration */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            border: "1px solid #eee",
            p: 4,
          }}
        >
          <img
            src="/images/indico.png"
            alt="Login Illustration"
            className="w-3/4 max-w-sm drop-shadow-xl"
          />
        </Box>

        {/* Right: Form Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 4, md: 6 },
          }}
        >
          <CardContent sx={{ width: "100%", maxWidth: 360 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome Back 👋
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 4, color: "text.secondary" }}
            >
              Sign in to access your dashboard
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 3 }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 2 }}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Login
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="caption"
              display="block"
              align="center"
              sx={{ color: "text.secondary" }}
            >
              Use: <b>admin@example.com</b> / <b>123456</b>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
