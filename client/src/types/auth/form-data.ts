import { loginSchema, registerUserSchema } from "@/lib/zod/auth-schema";
import z from "zod";

export type LoginFormData = z.infer<typeof loginSchema>

export type RegisterUserFormData = z.infer<typeof registerUserSchema>
