import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { errorPassworMessages } from "@/lib/zod/auth-schema";
import Link from "next/link"
import { AuthFormProps } from "../auth-form";
import { FC, useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react"


interface PropsInputPassword extends AuthFormProps {
    formId?: string
}

const InputPassword: FC<PropsInputPassword> = ({ formId, register, errors }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const toggleType = () => setShowPassword(prev => !prev)

    return (
        <div className="grid gap-3">
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {
                    formId === "login" ?
                        (<Link
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>)
                        : ""
                }
            </div>
            <div className="relative flex items-center">
                <Input
                    type={showPassword ? "text" : "password"} {...register("password")}
                    className={errors.password ? "border-red-500 focus-visible:ring-red-400" : ""}
                />
                <button
                    type="button"
                    title={`${showPassword ? "Ocultar" : "Mostrar"} contraseña`}
                    className="absolute right-1 cursor-pointer"
                    aria-label="toggle show password"
                    onClick={toggleType}
                >
                    {
                        showPassword
                            ? <EyeOff className="size-6 text-foreground/80" />
                            : <EyeIcon className="size-6 text-foreground/80" />
                    }
                </button>
            </div>
            {formId === "register" ? (
                <div className="text-sm space-y-1 text-muted-foreground">
                    <p>La contraseña:</p>
                    <ul className="list-disc list-inside space-y-1">
                        {errorPassworMessages.map((text) => (
                            <li key={text}
                                className={(text == errors.password?.message ? "text-red-400" : "")}
                            >
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                < p className="text-red-500 text-sm">
                    {errors.password?.message}
                </p>
            )}

        </div>
    )
}

export default InputPassword