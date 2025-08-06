"use server"

import { loginSchema } from "@/lib/zod/auth-schema";
import { LoginFormData } from "@/types/auth/form-data";
import fetcher from "@/utils/fetcher";
import { cookies } from "next/headers";

type Response = { access_token: string, token_type: string }

const onLoginSubmit = async (formData: LoginFormData): Promise<{ error?: string, email?: string }> => {
    const validated = loginSchema.safeParse(formData)

    if (!validated.success) return { error: 'Datos inválidos' }


    const res = await fetcher<Response>({
        url: `${process.env.SERVER_URL}/auth/login`,
        method: "POST",
        body: JSON.stringify(validated.data)
    })

    if (!res.success) return { error: res.message }

    const useCookie = await cookies()

    if (res.data) {
        useCookie.set({
            name: "access_token",
            value: res.data.access_token,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            // 30 minutos de expiracion
            expires: new Date(Date.now() + 30 * 60 * 1000)
        })
    }


    return { email: formData.email }
}


export default onLoginSubmit