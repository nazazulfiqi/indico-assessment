import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),
  
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  
  company: z
    .string()
    .min(1, "Company is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
});

export type UserSchema = z.infer<typeof userSchema>;