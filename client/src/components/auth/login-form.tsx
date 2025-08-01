"use client"
import Link from "next/link"
import AuthForm from "./auth-form"
import onLoginSubmit from "@/actions/auth/login"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/lib/zod/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormData } from "@/types/auth/form-data"
import SubmitButton from "./submit-button"
import { useState, useTransition } from "react"

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>("")

  const onSubmit = handleSubmit((values: LoginFormData) => {
    startTransition(async () => {
      setError("")
      const response = await onLoginSubmit(values)
      if (response.error) setError(response.error)
    })
  })

  return (
    <div className="flex flex-col gap-6" >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <AuthForm
        id="login"
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
      
      {<p className="text-red-500 text-sm font-semibold text-center">{error}</p>}

      <SubmitButton pendingText="Iniciando" text="Iniciar sesión" form="login" isPending={isPending} />

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Registrarme
        </Link>
      </div>
    </div >
  )
}

export default LoginForm