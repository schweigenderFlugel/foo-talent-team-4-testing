"use server"

import { registerUserSchema } from "@/lib/zod/auth-schema"
import { RegisterUserFormData } from "@/types/auth/form-data"


const onRegisterSubmit = async (formData: RegisterUserFormData): Promise<{ error?: string }> => {
    const validated = registerUserSchema.safeParse(formData)

    if (!validated.success) return { error: 'Datos inválidos' }


    const { email, password } = validated.data


    return {}
}


export default onRegisterSubmit