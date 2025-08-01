"use server"

import { registerUserSchema } from "@/lib/zod/auth-schema"
import { RegisterUserFormData } from "@/types/auth/form-data"
import fetcher from "@/utils/fetcher"


const onRegisterSubmit = async (formData: RegisterUserFormData): Promise<{ error?: string, message?: string }> => {
    const validated = registerUserSchema.safeParse(formData)

    if (!validated.success) return { error: 'Datos inválidos' }


    const res = await fetcher({
        url: `${process.env.SERVER_URL}/auth/register`,
        method: "POST",
        body: JSON.stringify(validated.data)
    })

    console.log(res);
    if (!res.success) return { error: res.message }

    return { message: res.message }
}


export default onRegisterSubmit