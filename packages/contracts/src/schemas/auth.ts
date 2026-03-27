import * as z from "zod/v3";

export const signUpSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/, "Name must be in the format 'Last name First name'")
    .nonempty("Name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .nonempty("Password is required"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
