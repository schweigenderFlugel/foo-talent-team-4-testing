import { z } from "zod"

export const errorPassworMessages = [
    "Debe tener al menos 6 caracteres",
    "Debe contener al menos una letra mayúscula",
    "Debe contener al menos una letra minúscula",
    "Debe contener al menos un número",
    "Debe incluir al menos un carácter especial",
    "No puede contener espacios"
]

export const passwordSchema = z
    .string()
    .min(6, errorPassworMessages[0])
    .regex(/[A-Z]/, errorPassworMessages[1])
    .regex(/[a-z]/, errorPassworMessages[2])
    .regex(/[0-9]/, errorPassworMessages[3])
    .regex(/[!@#$%^&*(),.?":{}|<>]/, errorPassworMessages[4])
    .regex(/^[^\s]+$/, errorPassworMessages[5])




export const loginSchema = z.object({
    // username: z.string().min(1, "El nombre de usuario es obligatorio"),
    email: z.email({ message: "Correo electrónico inválido" }),
    password: z.string().min(1, "La contraseña es obligatoria"),
})


export const registerUserSchema = loginSchema.extend({
    // username: z.string().min(3, "Mínimo 3 caracteres"),
    // name: z.string().optional(),
    password: passwordSchema,
    // confirmPassword: passwordSchema,
    // role: z.enum(["admin", "gerencia"], {
    //     error: "El rol es obligatorio"
    // }),
})
// .refine((data) => data.password === data.confirmPassword, {
//     message: "Las contraseñas no coinciden",
//     path: ["confirmPassword"],
// })



