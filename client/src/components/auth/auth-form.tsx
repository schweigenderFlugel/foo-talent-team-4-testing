import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";



const AuthForm = ({ className, ...props }: ComponentProps<"form">) => {
  return (
    <form className={cn(className, "grid gap-6")} {...props}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          {
            props.id === "login" ?
              (<Link
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>)
              : ""
          }
        </div>
        <Input id="password" type="password" required />
      </div>
    </form>
  )
}

export default AuthForm;