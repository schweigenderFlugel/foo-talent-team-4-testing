import { Button } from "@/components/ui/button"
import Link from "next/link"
import AuthForm from "./auth-form"
import onLoginSubmit from "@/actions/auth/login"

const LoginForm = () => {

  return (
    <div className="flex flex-col gap-6" >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <AuthForm id="login" action={onLoginSubmit} />

      <Button type="submit" form="login" className="w-full">
        Login
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div >
  )
}

export default LoginForm