"use server"

import { loginSchema } from "@/lib/zod/auth-schema";
import { LoginFormData } from "@/types/auth/form-data";

const onLoginSubmit = async (formData: LoginFormData): Promise<{ error?: string }> => {
    const validated = loginSchema.safeParse(formData)

    if (!validated.success) return { error: 'Datos inválidos' }


    const { email, password } = validated.data
    if (email != "admin@hot.com") {
        return { error: 'La contraseña y/o correo son incorrectos.' }
    }

    return {}
}


export default onLoginSubmit