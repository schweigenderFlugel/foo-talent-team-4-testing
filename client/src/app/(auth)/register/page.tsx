import { GalleryVerticalEnd } from "lucide-react"
import RegisterForm from "@/components/auth/register-form"

export const metadata = {
  title: "Register"
}

const RegisterPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://wallpaperbat.com/img/853516-marvel-comic-characters-wallpaper-top-free-marvel-comic-characters-background.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-left brightness-[0.9]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Equipo04
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}


export default RegisterPage