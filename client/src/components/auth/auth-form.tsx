import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { LoginFormData } from "@/types/auth/form-data";
import InputPassword from "./form/input-password";

export interface AuthFormProps {
  register: UseFormRegister<LoginFormData>
  errors: FieldErrors<LoginFormData>
}

const AuthForm = ({ className, register, errors, ...props }: ComponentProps<"form"> & AuthFormProps) => {
  return (
    <form className={cn(className, "grid gap-6")} {...props}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input placeholder="m@example.com" {...register("email")} className={errors.email ? "border-red-500 focus-visible:ring-red-400" : ""} />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      <InputPassword formId={props.id} register={register} errors={errors} />
    </form >
  )
}

export default AuthForm;