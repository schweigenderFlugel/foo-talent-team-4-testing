"use client"
import Link from "next/link"
import AuthForm from "./auth-form"
import onRegisterSubmit from "@/actions/auth/register"
import { useState, useTransition } from "react"
import { RegisterUserFormData } from "@/types/auth/form-data"
import { useForm } from "react-hook-form"
import SubmitButton from "./submit-button"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUserSchema } from "@/lib/zod/auth-schema"

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
  })

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>("")

  const onSubmit = handleSubmit((values: RegisterUserFormData) => {
    startTransition(async () => {
      setError("")
      const response = await onRegisterSubmit(values)
      if (response.error) setError(response.error)
    })
  })

  return (
    <div className="flex flex-col gap-6" >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to register for a new account.
        </p>
      </div>
      
      <AuthForm
        id="register"
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />

      {<p className="text-red-500 text-sm font-semibold text-center">{error}</p>}

      <SubmitButton pendingText="Iniciando" text="Iniciar sesión" form="register" isPending={isPending} />

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div >
  )
}

export default RegisterForm