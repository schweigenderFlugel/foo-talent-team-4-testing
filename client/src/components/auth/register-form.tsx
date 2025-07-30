import { Button } from "@/components/ui/button"
import Link from "next/link"
import AuthForm from "./auth-form"
import onRegisterSubmit from "@/actions/auth/register"

const RegisterForm = () => {

  return (
    <div className="flex flex-col gap-6" >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to register for a new account.
        </p>
      </div>

      <AuthForm id="register" action={onRegisterSubmit} />

      <Button type="submit" form="register" className="w-full">
        Register
      </Button>

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